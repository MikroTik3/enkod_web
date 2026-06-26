'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Check, Copy, Loader2, TriangleAlert } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Alert, AlertDescription, AlertTitle } from '../../ui/alert'
import { Badge } from '../../ui/badge'
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

import { fetchRecovery, totpEnable, totpGenerateSecret } from '@/api/requests'

const enableTotpSchema = z.object({
	pin: z
		.string()
		.min(6, {
			message: 'PIN-код повинен містити мінімум 6 символів'
		})
		.max(6, {
			message: 'PIN-код повинен містити не більше 6 символів'
		}),
	secret: z.string()
})

export type EnableTotp = z.infer<typeof enableTotpSchema>

export function EnableTotpForm() {
	const [isOpen, setIsOpen] = useState(false)
	const [step, setStep] = useState(1)

	const [isCopied, setIsCopied] = useState(false)

	const queryClient = useQueryClient()

	const {
		mutate,
		data: totp,
		isPending: isLoadingGenerate
	} = useMutation({
		mutationKey: ['totp generate secret'],
		mutationFn: () => totpGenerateSecret()
	})

	const {
		data,
		isLoading: isLoadingRecovery,
		refetch
	} = useQuery({
		queryKey: ['fetch recovery codes'],
		queryFn: () => fetchRecovery(),
		enabled: step === 2
	})

	const { mutateAsync, isPending } = useMutation({
		mutationKey: ['totp enable'],
		mutationFn: (data: EnableTotp) => totpEnable(data),
		onSuccess() {
			refetch()
			queryClient.invalidateQueries({ queryKey: ['mfa status'] })
			setStep(2)
		},
		onError(error: any) {
			toast.error(
				error.response?.data?.message ??
					'Помилка при верифікації кода'
			)
		}
	})

	const form = useForm<EnableTotp>({
		resolver: zodResolver(enableTotpSchema),
		defaultValues: {
			pin: '',
			secret: ''
		}
	})

	function onCopy() {
		if (!totp?.secret) return

		setIsCopied(true)
		navigator.clipboard.writeText(totp?.secret)
		setTimeout(() => {
			setIsCopied(false)
		}, 2000)
	}

	const Icon = isCopied ? Check : Copy

	useEffect(() => {
		if (isOpen) {
			mutate()
		}
	}, [mutate, isOpen])

	function splitArrayIntoColumns(arr: string[]) {
		if (!arr || arr.length === 0) return [[], [], []]

		const mid = Math.ceil(arr.length / 3)
		const first = arr.slice(0, mid)
		const second = arr.slice(mid, mid * 2)
		const third = arr.slice(mid * 2)

		return [first, second, third]
	}

	function handleDownload() {
		const recoveryCodesText = data?.join('\n')

		const blob = new Blob([recoveryCodesText!], { type: 'text/plain' })
		const fileURL = window.URL.createObjectURL(blob)
		const link = document.createElement('a')

		link.href = fileURL
		link.setAttribute('download', 'mnclimate_recovery_codes.txt')

		document.body.appendChild(link)
		link.click()

		setTimeout(() => window.URL.revokeObjectURL(fileURL), 0)
	}

	async function onSubmit(data: EnableTotp) {
		mutateAsync({
			pin: data.pin,
			secret: totp?.secret ?? ''
		})
	}

	const recoveryCodes = data ? splitArrayIntoColumns(data) : [[], [], []]

	return (
		<Dialog
			open={isOpen}
			onOpenChange={state => {
				form.reset()
				setIsOpen(state)
			}}
		>
			<DialogTrigger asChild>
				<Button>Увімкнути</Button>
			</DialogTrigger>
			<DialogContent className='max-w-[550px] p-0'>
				<DialogHeader className='p-7 pb-0'>
					<DialogTitle>
						{step === 1
							? 'Додатки для аутентифікації'
							: 'Коди восстановлення'}
					</DialogTitle>
					<DialogDescription>
						{step === 1
							? 'При кожному вході в обліковий запис, крім пароля, потрібно буде вводити одноразовий код з додатку-аутентифікатора.'
							: 'Ці коди допоможуть вам отримати доступ до облікового запису, якщо ви втратите доступ до пристрою та не зможете отримувати коди двофакторної аутентифікації.'}
					</DialogDescription>
				</DialogHeader>

				{isLoadingGenerate ? (
					<div className='flex items-center justify-center py-6'>
						<Loader2 className='text-muted-foreground size-10 animate-spin' />
					</div>
				) : (
					step === 1 && (
						<div className='flex flex-col space-y-5'>
							<div>
								<div className='flex items-center gap-2 px-7 font-medium'>
									<Badge>Крок 1</Badge>
									Відскануйте QR-код
								</div>
								<p className='text-muted-foreground mt-2 px-7 text-sm'>
									Відскануйте QR-код нижче
									або введіть секретний ключ
									вручну в
									додаток-аутентифікатор.
								</p>
								<div className='dark:bg-accent mt-4 grid grid-cols-2 items-center gap-4 border bg-stone-200 px-7 py-4'>
									<img
										src={
											totp?.qrCodeUrl
										}
										alt='QR-код'
										className='w-fit rounded-lg'
									/>
									<div>
										<h3 className='font-medium'>
											Проблеми з
											QR-кодом?
										</h3>
										<p className='text-muted-foreground mt-1 text-sm'>
											Введіть
											секретний ключ
											вручну:
										</p>
										<div className='border-input bg-background mt-2 h-8 w-full rounded-lg border px-3 py-1.5 text-[13px]'>
											{totp?.secret}
										</div>
										<Button
											onClick={
												onCopy
											}
											variant='outline'
											className='hover:bg-popover mt-2'
											disabled={
												!totp?.secret ||
												isCopied ||
												isPending
											}
										>
											<Icon />
											Копіювати
										</Button>
									</div>
								</div>
							</div>
							<div className='px-7'>
								<div className='flex items-center gap-2 font-medium'>
									<Badge>Крок 2</Badge>
									Верифікація кода
								</div>
								<p className='text-muted-foreground mt-2 text-sm'>
									Введіть шестизначний код з
									додатку.
								</p>
								<form
									onSubmit={form.handleSubmit(
										onSubmit
									)}
									className='mt-4'
								>
									<FieldGroup>
										<Controller
											control={
												form.control
											}
											name='pin'
											render={({
												field,
												fieldState
											}) => (
												<Field>
													<FieldLabel>
														Введіть
														код
													</FieldLabel>

													<Input
														type='password'
														placeholder='XXXXXX'
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

									<DialogFooter className='mt-5 pb-7'>
										<DialogClose
											asChild
										>
											<Button variant='outline'>
												Відміна
											</Button>
										</DialogClose>
										<Button
											type='submit'
											isLoading={
												isPending
											}
										>
											Продовжити
										</Button>
									</DialogFooter>
								</form>
							</div>
						</div>
					)
				)}

				{isLoadingRecovery ? (
					<div className='flex items-center justify-center py-6'>
						<Loader2 className='text-muted-foreground size-10 animate-spin' />
					</div>
				) : (
					step === 2 && (
						<div className='flex flex-col space-y-5 px-7'>
							<Alert variant='warning'>
								<TriangleAlert className='size-5 dark:text-yellow-500' />
								<AlertTitle className='ml-1.5'>
									Будь ласка, зберігайте їх
									у безпечному місці.
								</AlertTitle>
								<AlertDescription className='ml-1.5'>
									Вони — останній спосіб
									відновлення доступу до
									облікового запису.
								</AlertDescription>
							</Alert>
							<div className='bg-accent mt-4 flex justify-center gap-16 rounded-lg p-3'>
								<div className='flex flex-col'>
									{recoveryCodes[0].map(
										(code, index) => (
											<p
												key={
													index
												}
												className='text-[17px] font-medium'
											>
												{code}
											</p>
										)
									)}
								</div>
								<div className='flex flex-col'>
									{recoveryCodes[1].map(
										(code, index) => (
											<p
												key={
													index
												}
												className='text-[17px] font-medium'
											>
												{code}
											</p>
										)
									)}
								</div>
								<div className='flex flex-col'>
									{recoveryCodes[2].map(
										(code, index) => (
											<p
												key={
													index
												}
												className='text-[17px] font-medium'
											>
												{code}
											</p>
										)
									)}
								</div>
							</div>
							<DialogFooter className='flex gap-x-2 pb-7 sm:justify-between'>
								<DialogClose asChild>
									<Button
										variant='outline'
										className='h-9'
									>
										Закрити
									</Button>
								</DialogClose>
								<div className='flex items-center gap-2'>
									<Button
										variant='outline'
										className='h-9'
										disabled={isPending}
									>
										Копіювати
									</Button>
									<Button
										className='h-9'
										onClick={
											handleDownload
										}
									>
										Завантажити
									</Button>
								</div>
							</DialogFooter>
						</div>
					)
				)}
			</DialogContent>
		</Dialog>
	)
}
