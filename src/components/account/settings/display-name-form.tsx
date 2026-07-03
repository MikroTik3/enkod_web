import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel
} from '@/components/ui/field'

import { Button } from '../../ui/button'
import { Input } from '../../ui/input'

import type { AccountResponse } from '@/api/generated'
import { patchUser } from '@/api/requests'

const displayNameSchema = z.object({
	displayName: z.string({ message: "Ім'я є обов'язковим" })
})

export type DisplayName = z.infer<typeof displayNameSchema>

interface DisplayNameFormProps {
	user: AccountResponse | undefined
}

export function DisplayNameForm({ user }: DisplayNameFormProps) {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: ['patch user'],
		mutationFn: (data: DisplayName) => patchUser(data),
		onSuccess() {
			toast.success('Профіль оновлено')
		},
		onError(error: any) {
			toast.error(
				error.response?.data?.message ??
					'Помилка під час оновлення профілю'
			)
		}
	})

	const form = useForm<DisplayName>({
		resolver: zodResolver(displayNameSchema),
		values: {
			displayName: user?.displayName ?? ''
		}
	})

	const { isDirty } = form.formState

	async function onSubmit(data: DisplayName) {
		await mutateAsync(data)
	}

	return (
		<div>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='grid gap-4'
			>
				<FieldGroup>
					<Controller
						control={form.control}
						name='displayName'
						render={({ field, fieldState }) => (
							<Field>
								<FieldLabel>
									Ваше ім'я
								</FieldLabel>
								<div className='relative'>
									<Input
										placeholder='Tony Stark'
										disabled={isPending}
										{...field}
									/>
									{isDirty && (
										<div className='absolute right-0 bottom-0 flex h-full items-center justify-center px-2'>
											<Button
												className='h-6 rounded-lg px-3 text-xs'
												isLoading={
													isPending
												}
											>
												Зберегти
											</Button>
										</div>
									)}
								</div>
								<FieldDescription>
									Змініть своє ім'я на будь-яке,
									яке забажаєте.
								</FieldDescription>
								<FieldError
									errors={[
										fieldState.error
									]}
								/>
							</Field>
						)}
					/>
				</FieldGroup>
			</form>
		</div>
	)
}