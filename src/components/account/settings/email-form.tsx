import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CheckCircle, Mail, MoreHorizontal, Pencil } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Badge } from '../../ui/badge'
import { Button } from '../../ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '../../ui/dialog'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '../../ui/dropdown-menu'
import { Field, FieldError, FieldGroup, FieldLabel } from '../../ui/field'
import { Input } from '../../ui/input'

import type { AccountResponse } from '@/api/generated'
import { changeEmail, sendEmailVerification } from '@/api/requests'

const emailSchema = z.object({
	email: z
		.string()
		.min(1, { message: `Email обов'язковий` })
		.email({ message: 'Введіть правильну адресу електронної пошти' })
})

export type Email = z.infer<typeof emailSchema>

interface EmailFormProps {
	user: AccountResponse | undefined
}

export function EmailForm({ user }: EmailFormProps) {
	const [isOpen, setIsOpen] = useState(false)

	const queryClient = useQueryClient()

	const { mutate: send } = useMutation({
		mutationKey: ['send email verification'],
		mutationFn: () => sendEmailVerification(),
		onSuccess() {
			toast.success(
				'Посилання з підтвердженням було надіслано на вашу поштову адресу'
			)
		},
		onError(error: any) {
			toast.error(
				error.response?.data?.message ??
					'Помилка при відправці листа'
			)
		}
	})

	const { mutateAsync, isPending } = useMutation({
		mutationKey: ['change email'],
		mutationFn: (data: Email) => changeEmail(data),
		onSuccess() {
			form.reset()
			setIsOpen(false)
			queryClient.invalidateQueries({ queryKey: ['get me'] })
		},
		onError(error: any) {
			toast.error(
				error.response?.data?.message ??
					'Помилка при зміні пошти'
			)
		}
	})

	const form = useForm<Email>({
		resolver: zodResolver(emailSchema),
		defaultValues: {
			email: ''
		}
	})

	async function onSubmit(data: Email) {
		await mutateAsync(data)
	}

	return (
		<div className='flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0'>
			<div className='mr-5 flex w-full items-start gap-x-4 md:w-auto md:items-center'>
				<div className='flex w-full flex-col'>
					<div className='mb-1 flex items-center gap-2'>
						<h2 className='font-semibold'>Пошта</h2>
						{user?.email ? (
							user.isEmailVerified ? (
								<Badge variant='success'>
									Підтверджено
								</Badge>
							) : (
								<Badge variant='error'>
									Не підтверджено
								</Badge>
							)
						) : (
							<Badge variant='warning'>
								Не вказано
							</Badge>
						)}
					</div>
					{user?.email ? (
						<p className='text-muted-foreground text-sm'>
							Ваш обліковий запис прив'язаний до
							адреси{' '}
							<span className='text-primary font-medium'>
								{user.email}
							</span>
							. На нього ми надсилаємо повідомлення
							та важливу інформацію.
						</p>
					) : (
						<p className='text-muted-foreground text-sm'>
							У вашому обліковому записі поки що
							немає пошти. Додайте її, щоб
							отримувати повідомлення та мати
							можливість відновити доступ.
						</p>
					)}
				</div>
			</div>
			<div>
				{user?.email ? (
					<DropdownMenu>
						<DropdownMenuTrigger
							asChild
							className='border-none ring-0'
						>
							<Button variant='ghost' size='icon'>
								<MoreHorizontal className='size-5' />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end' side='top'>
							<DropdownMenuGroup>
								{!user.isEmailVerified && (
									<DropdownMenuItem
										onClick={() =>
											send()
										}
									>
										<CheckCircle />
										Підтвердити
									</DropdownMenuItem>
								)}
								<DropdownMenuItem
									onClick={() =>
										setIsOpen(true)
									}
								>
									<Pencil />
									Змінити
								</DropdownMenuItem>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				) : (
					<Button
						variant='outline'
						onClick={() => setIsOpen(true)}
					>
						Прив'язати
					</Button>
				)}

				<Dialog
					open={isOpen}
					onOpenChange={state => {
						form.reset()
						setIsOpen(state)
					}}
				>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>
								Оновлення пошти
							</DialogTitle>
							<DialogDescription>
								Введіть нову поштову адресу.
							</DialogDescription>
						</DialogHeader>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='grid gap-4'
						>
							<FieldGroup>
								<Controller
									name='email'
									control={form.control}
									render={({
										field,
										fieldState
									}) => (
										<Field>
											<FieldLabel>
												Ел.
												пошта
											</FieldLabel>
											<Input
												{...field}
												aria-invalid={
													fieldState.invalid
												}
												placeholder='anton@example.com'
												autoComplete='email'
												disabled={
													isPending
												}
												type='text'
											/>
											<FieldError
												errors={[
													fieldState.error
												]}
											/>
										</Field>
									)}
								/>
							</FieldGroup>
							<DialogFooter>
								<DialogClose asChild>
									<Button variant='outline'>
										Відміна
									</Button>
								</DialogClose>
								<Button
									type='submit'
									isLoading={isPending}
								>
									Оновити
								</Button>
							</DialogFooter>
						</form>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	)
}
