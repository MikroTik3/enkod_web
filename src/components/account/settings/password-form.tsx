import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { KeyRound } from 'lucide-react'
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

const passwordSchema = z
	.object({
		newPassword: z
			.string()
			.min(6, {
				message: 'Новий пароль повинен містити хоча б 6 символів'
			})
			.max(128, {
				message: 'Новий пароль повинен містити не більше 128 символів'
			}),
		confirmPassword: z.string()
	})
	.refine(data => data.newPassword === data.confirmPassword, {
		message: 'Паролі не співпадають',
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
		},
		onError(error: any) {
			toast.error(
				error.response?.data?.message ??
					'Помилка при зміні пароля'
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
		<div className='flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0'>
			<div className='mr-5 flex w-full items-start gap-x-4 md:w-auto md:items-center'>
				<div className='hidden rounded-full bg-blue-600 p-2.5 md:flex'>
					<KeyRound className='size-5 stroke-[1.7px] text-white' />
				</div>
				<div className='flex w-full flex-col'>
					<h2 className='mb-1 font-semibold'>Пароль</h2>
					<p className='text-muted-foreground text-sm'>
						Пароль — ключ до вашого облікового запису.
						Нікому його не повідомляйте. За необхідності
						ви можете змінити його тут для підвищення
						безпеки.
					</p>
				</div>
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
						<Button variant='outline'>Змінити</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>
								Оновлення пароля
							</DialogTitle>
							<DialogDescription>
								Введіть поточний і новий пароль
								для оновлення.
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
												Підтвердьте
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
