'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Captcha } from '../shared/captcha'
import { Button } from '../ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'

import { AuthWrapper } from './auth-wrapper'
import { sendPasswordReset } from '@/api/requests'
import { ROUTES } from '@/constants'

const resetPasswordSchema = z.object({
	email: z
		.string()
		.email({ message: 'Введіть правильну адресу електронної пошти' }),
	captcha: z.string()
})

export type ResetPassword = z.infer<typeof resetPasswordSchema>

export function ResetPasswordForm() {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: ['send password reset'],
		mutationFn: (data: ResetPassword) => sendPasswordReset(data),
		onSuccess() {
			form.reset()
			toast.success('Письмо з інструкціями надіслано на вашу пошту')
		},
		onError(error: any) {
			const message =
				error.response?.data?.message ??
				'Помилка при скиданні пароля'

			toast.error(message)
		}
	})

	const form = useForm<ResetPassword>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			email: '',
			captcha: ''
		}
	})

	useEffect(() => {
		if (
			form.formState.isSubmitSuccessful &&
			form.getValues('captcha')
		) {
			form.reset()
		}
	}, [form, form.reset, form.formState.isSubmitSuccessful])

	async function onSubmit(data: ResetPassword) {
		if (!data.captcha) {
			toast.warning('Пройдіть капчу!')
			return
		}

		await mutateAsync(data)
	}

	return (
		<AuthWrapper
			heading='Скидання пароля'
			description='Введіть вашу пошту, щоб отримати посилання для скидання пароля'
			bottomText='Уже є аккаунт?'
			bottomLinkText='Увійти'
			bottomLinkHref={ROUTES.AUTH.LOGIN()}
		>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='grid gap-4'
			>
				<FieldGroup>
					<div className='space-y-4'>
						<Controller
							control={form.control}
							name='email'
							render={({ field, fieldState }) => (
								<Field
									data-invalid={
										fieldState.invalid
									}
								>
									<FieldLabel>
										Почта
									</FieldLabel>

									<Input
										placeholder='email@anton.com'
										disabled={isPending}
										{...field}
									/>

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

						<Controller
							control={form.control}
							name='captcha'
							render={({ field }) => (
								<Field className='flex flex-col items-center justify-center'>
									<Captcha
										onVerify={token =>
											form.setValue(
												'captcha',
												token
											)
										}
										{...field}
									/>
								</Field>
							)}
						/>

						<Button
							type='submit'
							isLoading={isPending}
							className='w-full'
						>
							Продовжити
						</Button>
					</div>
				</FieldGroup>
			</form>
		</AuthWrapper>
	)
}
