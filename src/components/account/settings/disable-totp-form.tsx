import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { ConfirmDialog } from '@/components/shared/confirm-dialog'

import { Button } from '../../ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '../../ui/field'
import { Input } from '../../ui/input'

import { totpDisable } from '@/api/requests'

const disableTotpSchema = z.object({
	password: z
		.string()
		.min(6, { message: 'Пароль повинен містити хоча б 6 символів' })
})

export type DisableTotp = z.infer<typeof disableTotpSchema>

export function DisableTotpForm() {
	const [isOpen, setIsOpen] = useState(false)

	const queryClient = useQueryClient()

	const { mutateAsync, isPending } = useMutation({
		mutationKey: ['totp disable'],
		mutationFn: (data: DisableTotp) => totpDisable(data),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['mfa status'] })
			setIsOpen(false)
		},
		onError(error: any) {
			toast.error(
				error.response?.data?.message ??
					'Помилка при відключенні'
			)
		}
	})

	const form = useForm<DisableTotp>({
		resolver: zodResolver(disableTotpSchema),
		defaultValues: {
			password: ''
		}
	})

	useEffect(() => {
		form.reset()
	}, [form, form.reset, form.formState.isSubmitSuccessful])

	async function onSubmit(data: DisableTotp) {
		await mutateAsync(data)
	}

	return (
		<ConfirmDialog
			title='Відключення двофакторної аутентифікації'
			description={
				<div className='space-y-4'>
					<p className='mb-2'>
						Ви впевнені, що хочете відключити цей метод
						двофакторної аутентифікації?{' '}
					</p>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='mt-2'
					>
						<FieldGroup>
							<Controller
								name='password'
								control={form.control}
								render={({
									field,
									fieldState
								}) => (
									<Field
										data-invalid={
											fieldState.invalid
										}
									>
										<FieldLabel>
											Пароль
										</FieldLabel>
										<Input
											{...field}
											aria-invalid={
												fieldState.invalid
											}
											placeholder='*****'
											autoComplete='off'
											disabled={
												isPending
											}
											type='password'
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
						</FieldGroup>
					</form>
				</div>
			}
			confirmText='Відключити'
			destructive
			handleConfirm={form.handleSubmit(onSubmit)}
			isLoading={isPending}
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			<Button variant='destructive'>Відключити</Button>
		</ConfirmDialog>
	)
}
