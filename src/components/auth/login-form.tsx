'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import type { Route } from 'next'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
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
import { MfaForm } from './mfa-form'
import { useLogin } from '@/api/hooks'
import { instance } from '@/api/instance'
import { ROUTES } from '@/constants'
import { useFingerprint } from '@/hooks'

const loginSchema = z.object({
	email: z
		.string()
		.email({ message: 'Введіть коректну адресу електронної пошти' }),
	password: z
		.string()
		.min(6, { message: 'Пароль повинен містити хоча б 6 символів' })
		.max(128, {
			message: 'Пароль повинен містити не більше 128 символів'
		}),
	captcha: z.string()
})

export type Login = z.infer<typeof loginSchema>

export function LoginForm() {
	const [methods, setMethods] = useState<string[]>([])
	const [ticket, setTicket] = useState<string | null>(null)
	const [userId, setUserId] = useState<string | null>(null)
	const [isVisible, setIsVisible] = useState<boolean>(false)

	const router = useRouter()
	const searchParams = useSearchParams()

	const { data: fingerprint, error } = useFingerprint()

	const { mutateAsync, isPending } = useLogin({
		onSuccess(data) {
			if ('ticket' in data && typeof data.ticket === 'string') {
				setTicket(data.ticket)
				setMethods(data.allowedMethods)
				setUserId(data.userId)
			}

			if ('token' in data && typeof data.token === 'string') {
				cookies.set('token', data.token, { expires: 30 })

				instance.defaults.headers['X-Session-Token'] =
					data.token

				const redirectTo =
					searchParams.get('redirectTo') ||
					ROUTES.ACCOUNT.ROOT

				router.push(redirectTo as Route)
			}
		},
		onError(error: any) {
			const message =
				error.response?.data?.message ?? 'Помилка при вході'

			toast.error(message)
		}
	})

	const form = useForm<Login>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
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

	async function onSubmit(values: Login) {
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

	return methods.length ? (
		<MfaForm
			ticket={ticket ?? ''}
			methods={methods}
			userId={userId ?? ''}
			onBack={() => {
				setTicket(null)
				setMethods([])
			}}
		/>
	) : (
		<AuthWrapper
			heading='Увійти в обліковий запис'
			description='Для входу на сайт використовуйте ваш email і пароль, які були вказані під час реєстрації на сайті'
			bottomText='Ще немає акаунта?'
			bottomLinkText='Реєстрація'
			bottomLinkHref={ROUTES.AUTH.REGISTER}
			isShowSocial
		>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FieldGroup>
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
								<div className='flex items-center justify-between'>
									<FieldLabel>
										Пароль
									</FieldLabel>
									<Link
										href={
											ROUTES.AUTH
												.RECOVERY
										}
										className='text-sm font-medium underline'
									>
										Забули пароль?
									</Link>
								</div>
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

					<Controller
						name='captcha'
						control={form.control}
						render={({ field, fieldState }) => (
							<Field>
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
						disabled={isPending}
						isLoading={isPending}
					>
						Продовжити
					</Button>
				</FieldGroup>
			</form>
		</AuthWrapper>
	)
}
