import { startAuthentication } from '@simplewebauthn/browser'
import { ArrowLeftIcon, KeyIcon } from 'lucide-react'
import { Route } from 'next'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { cookies } from '@/lib/cookie'
import { cn } from '@/lib/utils'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp'

import { AuthWrapper } from './auth-wrapper'
import { useVerifyMfa } from '@/api/hooks/useVerifyMfa'
import { instance } from '@/api/instance'
import { generateAuthenticationOptions } from '@/api/requests'
import { MFA_OPTIONS, MfaMethod, ROUTES } from '@/constants'

interface MfaFormProps {
	ticket: string
	methods: string[]
	userId: string
	onBack?: () => void
}

export function MfaForm({ ticket, methods, userId, onBack }: MfaFormProps) {
	const [selectedMethod, setSelectedMethod] = useState<MfaMethod | null>(
		null
	)
	const [code, setCode] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const router = useRouter()
	const searchParams = useSearchParams()

	const { mutate, isPending } = useVerifyMfa({
		onSuccess(data, variables) {
			console.log('METHOD: ', variables.method)

			cookies.set('token', data.token, { expires: 30 })

			instance.defaults.headers['X-Session-Token'] = data.token

			const redirectTo =
				searchParams.get('redirectTo') || ROUTES.ACCOUNT.ROOT

			router.push(redirectTo as Route)
		},
		onError(error: any, variables) {
			const message =
				error.response?.data?.message ?? 'Помилка при вході'

			toast.error(message)
		}
	})

	const availableOptions = MFA_OPTIONS.filter(option =>
		methods.includes(option.id)
	)
	const handleMethodSelect = (method: MfaMethod) => {
		setSelectedMethod(method)
		setCode('')
	}

	const handleBack = () => {
		if (selectedMethod) {
			setSelectedMethod(null)
			setCode('')
		} else if (onBack) {
			onBack()
		}
	}

	const handleVerify = () => {
		if (!selectedMethod || !code.trim()) return

		const payload =
			selectedMethod === 'totp'
				? { ticket, totpCode: code }
				: { ticket, recoveryCode: code }

		mutate(payload)
	}

	const handlePasskeyAuth = async () => {
		setIsLoading(true)
		try {
			const options = await generateAuthenticationOptions({
				userId
			})
			const attestationResponse = await startAuthentication(options)

			mutate({ ticket, attestationResponse })
		} catch (error: any) {
			console.error('Passkey authentication failed:', error)
		} finally {
			setIsLoading(false)
		}
	}

	if (!selectedMethod) {
		return (
			<AuthWrapper
				heading='Підтвердіть вхід'
				description='Увімкнено багатофакторну автентифікацію. Оберіть спосіб підтвердження.'
			>
				<div className='space-y-4'>
					{availableOptions.map(option => {
						const Icon = option.icon
						return (
							<button
								key={option.id}
								onClick={() =>
									handleMethodSelect(
										option.id
									)
								}
								className={cn(
									'w-full rounded-lg border p-4 text-left transition-all duration-200',
									'hover:border-blue-300 hover:bg-blue-50/50 dark:hover:bg-blue-950/20',
									'focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none',
									'border-border bg-card'
								)}
							>
								<div className='flex items-center gap-4'>
									<div
										className={cn(
											'flex size-10 items-center justify-center rounded-lg bg-blue-500'
										)}
									>
										<Icon
											className={cn(
												'size-5 text-white'
											)}
										/>
									</div>
									<div className='min-w-0 flex-1'>
										<h3 className='text-foreground font-medium'>
											{option.name}
										</h3>
										<p className='text-muted-foreground mt-1 text-sm'>
											{
												option.description
											}
										</p>
									</div>
								</div>
							</button>
						)
					})}

					<Button
						variant='ghost'
						onClick={handleBack}
						className='mt-6 w-full'
					>
						<ArrowLeftIcon className='mr-2 h-4 w-4' />
						Назад до входу
					</Button>
				</div>
			</AuthWrapper>
		)
	}

	if (selectedMethod === 'totp') {
		return (
			<AuthWrapper
				heading='Введіть код'
				description='Відкрийте додаток-аутентифікатор і введіть 6-значний код'
			>
				<div className='space-y-4'>
					<div className='space-y-2'>
						<label
							htmlFor='totp-code'
							className='text-foreground text-sm font-medium'
						>
							Код підтвердження
						</label>

						<InputOTP
							maxLength={6}
							value={code}
							onChange={val => setCode(val)}
						>
							<InputOTPGroup>
								<InputOTPSlot index={0} />
								<InputOTPSlot index={1} />
								<InputOTPSlot index={2} />
								<InputOTPSlot index={3} />
								<InputOTPSlot index={4} />
								<InputOTPSlot index={5} />
							</InputOTPGroup>
						</InputOTP>
					</div>

					<Button
						onClick={handleVerify}
						className='w-full'
						disabled={!code.trim() || code.length !== 6}
						isLoading={isPending}
					>
						Продолжить
					</Button>

					<Button
						variant='ghost'
						onClick={handleBack}
						className='w-full'
						disabled={isLoading}
					>
						<ArrowLeftIcon className='mr-2 h-4 w-4' />
						Вибрати інший метод
					</Button>
				</div>
			</AuthWrapper>
		)
	}

	if (selectedMethod === 'passkey') {
		return (
			<AuthWrapper
				heading='Ключ доступу'
				description='Підтвердьте особистість за допомогою біометрії або ключа'
			>
				<div className='space-y-4'>
					<div className='flex flex-col items-center py-8'>
						<div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30'>
							<KeyIcon className='h-8 w-8 text-blue-600' />
						</div>
						<p className='text-muted-foreground text-center text-sm'>
							Дотримуйтесь підказок браузера або
							пристрою, щоб завершити аутентифікацію
						</p>
					</div>

					<Button
						onClick={handlePasskeyAuth}
						className='w-full'
						isLoading={isLoading}
					>
						{isLoading
							? 'Аутентифікація...'
							: 'Використовувати ключ'}
					</Button>

					<Button
						variant='ghost'
						onClick={handleBack}
						className='w-full'
						disabled={isPending}
					>
						<ArrowLeftIcon className='mr-2 h-4 w-4' />
						Вибрати інший метод
					</Button>
				</div>
			</AuthWrapper>
		)
	}

	if (selectedMethod === 'recovery') {
		return (
			<AuthWrapper
				heading='Введіть резервний код'
				description='Введіть один з ваших запасних кодів відновлення. Кожен код можна використовувати лише один раз'
			>
				<div className='space-y-4'>
					<div className='space-y-2'>
						<label
							htmlFor='recovery-code'
							className='text-foreground text-sm font-medium'
						>
							Резервний код
						</label>
						<Input
							id='recovery-code'
							type='text'
							placeholder='Введіть ваш резервний код'
							value={code}
							onChange={e =>
								setCode(e.target.value)
							}
							className='font-mono'
							autoComplete='one-time-code'
						/>
						<p className='text-muted-foreground text-xs'>
							Код відновлення для доступу до
							аккаунту
						</p>
					</div>

					<Button
						onClick={handleVerify}
						className='w-full'
						isLoading={isPending}
						disabled={
							!code.trim() || code.length !== 11
						}
					>
						Продовжити
					</Button>

					<Button
						variant='ghost'
						onClick={handleBack}
						className='w-full'
						disabled={isPending}
					>
						<ArrowLeftIcon className='mr-2 h-4 w-4' />
						Вибрати інший метод
					</Button>
				</div>
			</AuthWrapper>
		)
	}

	return null
}
