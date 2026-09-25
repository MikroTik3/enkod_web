'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'

import { ConfirmDialog } from '../../shared/confirm-dialog'
import { Button } from '../../ui/button'

import type { AccountResponse } from '@/api/generated'
import { toggleAutoBilling } from '@/api/requests'
import { ROUTES } from '@/constants'
import { Card, CardContent } from '@/components/ui/card'
import { IconWallet } from '@tabler/icons-react'
import { ChevronRight } from 'lucide-react'

interface AutoBillingFormProps {
	user: AccountResponse | undefined
}

export function AutoBillingForm({ user }: AutoBillingFormProps) {
	const [isOpen, setIsOpen] = useState(false)

	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationKey: ['toggle auto billing', user?.id],
		mutationFn: toggleAutoBilling,
		onSuccess: (data: any) => {
			setIsOpen(false)
			queryClient.invalidateQueries({ queryKey: ['get me'] })
			toast.success(data.response?.data?.message)
		},
		onError: (error: any) => {
			toast.error(
				error.response?.data?.message ??
					'Не вдалося змінити налаштування автоматичного списання'
			)
		}
	})

	return (			
		<div className='flex flex-col gap-y-3'>
			<Card className='py-0 shadow-none rounded-4xl'>
				<CardContent className='p-0'>
					<div className='flex gap-4 hover:bg-gray-100 px-4 py-2 items-center justify-between'>
						<div className='flex gap-x-2 items-center'>
							<div className='relative flex aspect-square items-center justify-center rounded-sm align-middle shadow-lg ring-1 ring-white/20 ring-offset-2 ring-inset size-7 bg-linear-to-b from-green-400 to-green-600 ring-offset-green-500'>
								<IconWallet className='size-4 text-white' />
							</div>
							<h2>
								Автоматическое списание
							</h2>
						</div>
						<div>
							{user?.isAutoBilling ? (
								<ConfirmDialog
									open={isOpen}
									onOpenChange={setIsOpen}
									title='Вимкнення автоматичних списань'
									description='Ви впевнені, що хочете вимкнути автоматичне списання? Передплата залишатиметься активною до кінця оплаченого періоду.'
									handleConfirm={mutate}
								>
									<button type="button" onClick={() => setIsOpen(true)} className="flex items-center">
										<span className='text-muted-foreground'>Увiмкнути</span>
										<ChevronRight className='size-5 text-muted-foreground'/>
									</button>
								</ConfirmDialog>
							) : (
								<Link href={ROUTES.SUBSCRIPTION} className="flex items-center">
									<span className='text-muted-foreground'>Увiмкнути</span>
									<ChevronRight className='size-5 text-muted-foreground'/>
								</Link>
							)}
						</div>
					</div>
				</CardContent>
			</Card>

			<p className='px-1 text-sm leading-5 text-muted-foreground'>
				Ежемесячно плата списывается автоматически.
				Автопродление можно отключить в любой
				момент.
			</p>
		</div>
	)
}
