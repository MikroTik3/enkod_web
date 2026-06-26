'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Eye, EyeOff } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '../ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'

import { AuthWrapper } from './auth-wrapper'
import { passwordReset } from '@/api/requests'
import { ROUTES } from '@/constants'

const newPasswordSchema = z.object({
	token: z.string().max(128, { message: 'Некоректний токен' }),
	password: z
		.string()
		.min(6, { message: 'Пароль повинен містити принаймні 6 символів' })
		.max(128, {
			message: 'Пароль повинен містити не більше 128 символів'
		})
})

export type NewPassword = z.infer<typeof newPasswordSchema>

export function NewPasswordForm() {
	const [isVisible, setIsVisible] = useState<boolean>(false)

	const { push } = useRouter()
	const { token } = useParams<{ token: string }>()

	const { mutateAsync, isPending } = useMutation({
		mutationKey: ['password reset'],
		mutationFn: (data: NewPassword) => passwordReset(data),
		onSuccess() {
			push(ROUTES.AUTH.LOGIN())
		},
		onError(error: any) {
			const message =
				error.response?.data?.message ??
				'Помилка при сбросі пароля'

			toast.error(message)
		}
	})

	const form = useForm<NewPassword>({
		resolver: zodResolver(newPasswordSchema),
		defaultValues: {
			token: '',
			password: ''
		}
	})

	useEffect(() => {
		form.reset()
	}, [form, form.reset, form.formState.isSubmitSuccessful])

	async function onSubmit(data: NewPassword) {
		await mutateAsync({
			token,
			password: data.password
		})
	}

	return (
		<AuthWrapper
			heading='Новий пароль'
			description='Встановіть новий пароль для вашого облікового запису'
			bottomText='Уже є аккаунт?'
			bottomLinkText='Увійти'
			bottomLinkHref={ROUTES.AUTH.LOGIN()}
		>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='grid gap-4'
			>
				<FieldGroup>
					<Controller
						name='password'
						control={form.control}
						render={({ field, fieldState }) => (
							<Field
								data-invalid={
									fieldState.invalid
								}
							>
								<FieldLabel htmlFor='form-rhf-demo-title'>
									Пароль
								</FieldLabel>
								<div className='relative'>
									<Input
										{...field}
										aria-invalid={
											fieldState.invalid
										}
										placeholder='******'
										autoComplete='off'
										disabled={isPending}
										type={
											isVisible
												? 'text'
												: 'password'
										}
									/>

									<div
										className='absolute top-2 right-3'
										onClick={() =>
											setIsVisible(
												!isVisible
											)
										}
									>
										{isVisible ? (
											<EyeOff className='size-5 opacity-50 hover:opacity-80' />
										) : (
											<Eye className='size-5 opacity-50 hover:opacity-80' />
										)}
									</div>
								</div>
								{fieldState.invalid && (
									<FieldError
										errors={[
											fieldState.error
										]}
									/>
								)}
							</Field>
						)}
					/>
				</FieldGroup>

				<Button
					type='submit'
					isLoading={isPending}
					className='w-full'
				>
					Продовжити
				</Button>
			</form>
		</AuthWrapper>
	)
}
