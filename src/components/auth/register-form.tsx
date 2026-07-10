'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'

import { cookies } from '@/lib/cookie'

import { Captcha } from '../shared/captcha'
import { Button } from '../ui/button'

import { AuthWrapper } from './auth-wrapper'
import { useRegister } from '@/api/hooks'
import { instance } from '@/api/instance'
import { ROUTES } from '@/constants'
import { useFingerprint } from '@/hooks'

const registerSchema = z.object({
	name: z.string().min(1, { message: "Ім'я обов'язково" }),
	email: z
		.string()
		.min(1, { message: "Email обов'язковий" })
		.email({ message: 'Введіть коректну адресу електронної пошти' }),
	password: z
		.string()
		.min(6, { message: 'Пароль повинен містити принаймні 6 символів' })
		.max(128, {
			message: 'Пароль повинен містити не більше 128 символів'
		}),
	captcha: z.string()
})

export type Register = z.infer<typeof registerSchema>

export function RegisterForm() {
	const { push } = useRouter()
	const { data: fingerprint, error } = useFingerprint()

	const [isVisible, setIsVisible] = useState<boolean>(false)

	const { mutateAsync, isPending } = useRegister({
		onSuccess(data) {
			cookies.set('token', data.token, { expires: 30 })

			instance.defaults.headers['X-Session-Token'] = data.token

			push(ROUTES.ACCOUNT.ROOT)
		},
		onError(error: any) {
			const message =
				error.response?.data?.message ??
				'Помилка при реєстрації'
			toast.error(message)
		}
	})

	const form = useForm<Register>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
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

	async function onSubmit(values: Register) {
		if (!values.captcha) {
			toast.warning('Пройдіть капчу!')
			return
		}

		const payload: any = {
			...values
		}

		if (fingerprint && !error) {
			payload.visitorId = fingerprint.visitorId
			payload.requestId = fingerprint.requestId
		}

		await mutateAsync(payload)
	}

	return (
		<AuthWrapper
			heading='Створіть обліковий запис'
			description="Для реєстрації достатньо ввести своє ім'я, email і придумати пароль"
			bottomText='Уже є акаунт?'
			bottomLinkText='Увійти'
			bottomLinkHref={ROUTES.AUTH.LOGIN()}
			isShowSocial
		>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FieldGroup>
					<Controller
						name='name'
						control={form.control}
						render={({ field, fieldState }) => (
							<Field
								data-invalid={
									fieldState.invalid
								}
							>
								<FieldLabel htmlFor='form-rhf-demo-title'>
									Ім'я
								</FieldLabel>
								<Input
									{...field}
									id='form-rhf-demo-title'
									aria-invalid={
										fieldState.invalid
									}
									placeholder='Микола'
									autoComplete='additional-name'
									disabled={isPending}
									type='text'
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
						name='email'
						control={form.control}
						render={({ field, fieldState }) => (
							<Field
								data-invalid={
									fieldState.invalid
								}
							>
								<FieldLabel htmlFor='form-rhf-demo-title'>
									Ел. пошта
								</FieldLabel>
								<Input
									{...field}
									id='form-rhf-demo-title'
									aria-invalid={
										fieldState.invalid
									}
									placeholder='anton@gmail.com'
									autoComplete='email'
									disabled={isPending}
									type='email'
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
						name='password'
						control={form.control}
						render={({ field, fieldState }) => (
							<Field
								data-invalid={
									fieldState.invalid
								}
							>
								<FieldLabel>Пароль</FieldLabel>
								<div className='relative'>
									<Input
										{...field}
										id='form-rhf-demo-title'
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

					<Controller
						name='captcha'
						control={form.control}
						render={({ field, fieldState }) => (
							<Field
								data-invalid={
									fieldState.invalid
								}
							>
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
						className='w-full'
						isLoading={isPending}
						disabled={isPending}
					>
						Продовжити
					</Button>
				</FieldGroup>
			</form>
		</AuthWrapper>
	)
}
