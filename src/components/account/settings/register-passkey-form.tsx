import { zodResolver } from '@hookform/resolvers/zod'
import { startRegistration } from '@simplewebauthn/browser'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
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

import { generateRegistrationOptions, verifyRegistration } from '@/api/requests'

const registerPasskeySchema = z.object({
	deviceName: z
		.string()
		.min(1, {
			message: 'Назва пристрою обов’язково'
		})
		.max(50, {
			message: 'Назва пристрою не повинна перевищувати 50 символів'
		})
})

export type RegisterPasskey = z.infer<typeof registerPasskeySchema>

export function RegisterPasskeyForm() {
	const [isOpen, setIsOpen] = useState(false)
	const [isRegistering, setIsRegistering] = useState(false)

	const queryClient = useQueryClient()

	const { mutateAsync, isPending } = useMutation({
		mutationKey: ['register passkey'],
		mutationFn: (data: any) => verifyRegistration(data),
		onSuccess() {
			form.reset()
			queryClient.invalidateQueries({ queryKey: ['mfa status'] })
			setIsOpen(false)
		},
		onError(error: any) {
			toast.error(
				error.response?.data?.message ??
					'Помилка під час створення ключа доступу'
			)
		}
	})

	const form = useForm<RegisterPasskey>({
		resolver: zodResolver(registerPasskeySchema),
		defaultValues: {
			deviceName: ''
		}
	})

	async function onSubmit(data: RegisterPasskey) {
		setIsRegistering(true)

		try {
			const options = await generateRegistrationOptions()

			const attestationResponse = await startRegistration(options)

			await mutateAsync({
				deviceName: data.deviceName,
				attestationResponse
			})
		} catch (error) {
			throw error
		} finally {
			setIsRegistering(false)
		}
	}

	return (
		<Dialog
			open={isOpen}
			onOpenChange={state => {
				form.reset()
				setIsOpen(state)
			}}
		>
			<DialogTrigger asChild>
				<Button>Додати</Button>
			</DialogTrigger>
			<DialogContent className='max-w-[550px] p-0'>
				<DialogHeader className='p-6 pb-0'>
					<DialogTitle>
						Реєстрація ключа доступу
					</DialogTitle>
					<DialogDescription>
						Введіть назву пристрою для реєстрації ключа
						доступу.
					</DialogDescription>
				</DialogHeader>

				<div className='px-6'>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FieldGroup>
							<Controller
								control={form.control}
								name='deviceName'
								render={({
									field,
									fieldState
								}) => (
									<Field>
										<FieldLabel>
											Назва пристрою
										</FieldLabel>
										<Input
											placeholder='MacBook Pro'
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
						<DialogFooter className='mt-6 pb-6'>
							<DialogClose asChild>
								<Button variant='outline'>
									Відміна
								</Button>
							</DialogClose>
							<Button
								type='submit'
								isLoading={
									isPending || isRegistering
								}
							>
								Додати
							</Button>
						</DialogFooter>
					</form>
				</div>
			</DialogContent>
		</Dialog>
	)
}
