import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '../../ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '../../ui/dialog'
import { Field, FieldError, FieldGroup, FieldLabel } from '../../ui/field'
import { Input } from '../../ui/input'

import { changePassword } from '@/api/requests'
import { IconPassword } from '@tabler/icons-react'
import { ChevronRight } from 'lucide-react'

const passwordSchema = z
	.object({
		newPassword: z
			.string()
			.min(6, {
				message: 'Новий пароль має містити щонайменше 6 символів'
			})
			.max(128, {
				message: 'Новий пароль має містити не більше 128 символів'
			}),
		confirmPassword: z.string()
	})
	.refine(data => data.newPassword === data.confirmPassword, {
		message: 'Паролі не збігаються',
		path: ['confirmPassword']
	})

export type Password = z.infer<typeof passwordSchema>

export function PasswordForm() {
	const [isOpen, setIsOpen] = useState(false)

	const { mutateAsync, isPending } = useMutation({
		mutationKey: ['change password'],
		mutationFn: (data: Password) => changePassword(data),
		onSuccess() {
			setIsOpen(false)
			toast.success('Пароль успішно оновлено')
		},
		onError(error: any) {
			toast.error(
				error.response?.data?.message ??
					'Помилка під час зміни пароля'
			)
		}
	})

	const form = useForm<Password>({
		resolver: zodResolver(passwordSchema),
		defaultValues: {
			newPassword: '',
			confirmPassword: ''
		}
	})

	useEffect(() => {
		form.reset()
	}, [form, form.reset, form.formState.isSubmitSuccessful])

	async function onSubmit(data: Password) {
		await mutateAsync(data)
	}

	return (
		<div className='flex gap-4 hover:bg-gray-100 px-4 py-2 items-center justify-between'>
			<div className='flex gap-x-2 items-center'>
				<div className='relative flex aspect-square items-center justify-center rounded-sm align-middle shadow-lg ring-1 ring-white/20 ring-offset-2 ring-inset size-7 bg-linear-to-b from-yellow-400 to-yellow-600 ring-offset-yellow-500'>
					<IconPassword className='size-4 text-white' />
				</div>
				<h2>
					Пароль
				</h2>
			</div>
			
			<div>
				<Dialog
					open={isOpen}
					onOpenChange={state => {
						form.reset()
						setIsOpen(state)
					}}
				>
					<DialogTrigger asChild>
						<div className="flex items-center">
							<span className='text-muted-foreground'>Змінити</span>
							<ChevronRight className='size-5 text-muted-foreground'/>
						</div>
					</DialogTrigger>

					<DialogContent>
						<DialogHeader>
							<DialogTitle>
								Зміна пароля
							</DialogTitle>
							<DialogDescription>
								Введіть новий пароль і
								підтвердьте його, щоб оновити
								пароль.
							</DialogDescription>
						</DialogHeader>

						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='grid gap-4'
						>
							<FieldGroup>
								<Controller
									control={form.control}
									name='newPassword'
									render={({
										field,
										fieldState
									}) => (
										<Field>
											<FieldLabel>
												Новий
												пароль
											</FieldLabel>

											<Input
												type='password'
												placeholder='******'
												disabled={
													isPending
												}
												aria-invalid={
													fieldState.invalid
												}
												{...field}
											/>

											<FieldError
												errors={[
													fieldState.error
												]}
											/>
										</Field>
									)}
								/>

								<Controller
									control={form.control}
									name='confirmPassword'
									render={({
										field,
										fieldState
									}) => (
										<Field>
											<FieldLabel>
												Підтвердіть
												новий
												пароль
											</FieldLabel>

											<Input
												type='password'
												placeholder='******'
												disabled={
													isPending
												}
												aria-invalid={
													fieldState.invalid
												}
												{...field}
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
										Скасувати
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
