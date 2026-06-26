'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
	Calendar,
	KeyRound,
	Loader2,
	MoreHorizontal,
	Trash
} from 'lucide-react'
import { useState } from 'react'

import { formatDate } from '@/lib/utils'

import { Button } from '../../ui/button'
import { Card } from '../../ui/card'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '../../ui/dialog'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '../../ui/dropdown-menu'

import { deletePasskey, fetchPasskeys } from '@/api/requests'

export function PasskeyModal() {
	const [isOpen, setIsOpen] = useState(false)

	const [deletePasskeyId, setDeletePasskeyId] = useState<string | null>(
		null
	)

	const queryClient = useQueryClient()

	const { data, isLoading } = useQuery({
		queryKey: ['fetch passkeys'],
		queryFn: () => fetchPasskeys(),
		enabled: isOpen
	})

	const { mutate, isPending } = useMutation({
		mutationKey: ['delete passkey'],
		mutationFn: (id: string) => deletePasskey(id),
		onSuccess: () => {
			setIsOpen(false)
			queryClient.invalidateQueries({ queryKey: ['mfa status'] })
			queryClient.invalidateQueries({
				queryKey: ['fetch passkeys']
			})
			setDeletePasskeyId(null)
		}
	})

	return (
		<>
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogTrigger asChild>
					<Button variant='outline'>
						Переглянути ключі
					</Button>
				</DialogTrigger>
				<DialogContent className='sm:max-w-[500px]'>
					<DialogHeader>
						<DialogTitle>
							Ваші ключі доступу
						</DialogTitle>
						<DialogDescription>
							Список всіх доданих ключів доступу для
							вашого облікового запису.
						</DialogDescription>
					</DialogHeader>

					{isLoading ? (
						<div className='flex items-center justify-center py-6'>
							<Loader2 className='text-muted-foreground size-10 animate-spin' />
						</div>
					) : (
						<div className='my-2'>
							{data?.length && (
								<div className='grid max-h-[300px] gap-3 overflow-y-auto pr-1'>
									{data?.map(
										(
											passkey,
											index
										) => (
											<Card
												key={
													index
												}
												className='hover:bg-muted/20 p-4 transition-colors'
											>
												<div className='flex items-start justify-between'>
													<div className='flex items-start gap-3'>
														<div className='flex items-center justify-center rounded-full bg-blue-600 p-2'>
															<KeyRound className='h-4 w-4 text-white' />
														</div>
														<div>
															<h4 className='text-sm font-medium'>
																{
																	passkey.deviceName
																}
															</h4>
															<div className='mt-2 space-y-1'>
																<div className='text-muted-foreground flex items-center text-xs'>
																	<Calendar className='mr-1.5 h-3.5 w-3.5' />
																	<span>
																		Додано:{' '}
																		{formatDate(
																			passkey.createdAt
																		)}
																	</span>
																</div>
																<div className='text-muted-foreground flex items-center text-xs'>
																	<Calendar className='mr-1.5 h-3.5 w-3.5' />
																	<span>
																		Останнє
																		використання:{' '}
																		{formatDate(
																			passkey.lastUsedAt
																		)}
																	</span>
																</div>
															</div>
														</div>
													</div>
													<DropdownMenu>
														<DropdownMenuTrigger
															asChild
														>
															<Button
																variant='ghost'
																size='icon'
																className='h-8 w-8'
															>
																<MoreHorizontal className='h-4 w-4' />
																<span className='sr-only'>
																	Дії
																</span>
															</Button>
														</DropdownMenuTrigger>
														<DropdownMenuContent align='end'>
															<DropdownMenuItem
																className='text-destructive focus:text-destructive'
																onClick={() =>
																	setDeletePasskeyId(
																		passkey.id
																	)
																}
															>
																<Trash className='mr-2 h-4 w-4' />
																Видалити
															</DropdownMenuItem>
														</DropdownMenuContent>
													</DropdownMenu>
												</div>
											</Card>
										)
									)}
								</div>
							)}
						</div>
					)}
				</DialogContent>
			</Dialog>

			<Dialog
				open={!!deletePasskeyId}
				onOpenChange={() => setDeletePasskeyId(null)}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							Видалити ключ доступу
						</DialogTitle>
						<DialogDescription>
							Ви впевнені, що хочете видалити цей
							ключ доступу? Цю дію неможливо
							скасувати.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button
							variant='outline'
							onClick={() =>
								setDeletePasskeyId(null)
							}
						>
							Відміна
						</Button>
						<Button
							variant='destructive'
							onClick={() =>
								deletePasskeyId &&
								mutate(deletePasskeyId)
							}
							isLoading={isPending}
						>
							Видалити
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	)
}
