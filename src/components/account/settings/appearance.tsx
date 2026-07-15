'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTheme } from 'next-themes'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Field, FieldGroup, FieldLabel } from '../../ui/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const appearanceSchema = z.object({
	theme: z.string()
})

export type Appearance = z.infer<typeof appearanceSchema>

export function AppearanceForm() {
	const { theme, setTheme } = useTheme()

	const { control, setValue } = useForm<Appearance>({
		resolver: zodResolver(appearanceSchema),
		defaultValues: {
			theme: theme || 'system'
		}
	})

	useEffect(() => {
		if (theme) {
			setValue('theme', theme)
		}
	}, [theme, setValue])

	return (
		<div className='flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0'>
			<div className='mr-5 flex w-full items-start gap-x-4 md:w-auto md:items-center'>
				<div className='flex w-full flex-col'>
					<h2 className='mb-1 font-semibold'>Тема</h2>

					<p className='text-muted-foreground text-sm'>
						Оберіть світлу, темну або системну тему, яка
						автоматично синхронізується з налаштуваннями
						вашої операційної системи.
					</p>
				</div>
			</div>

			<div className='w-37.5'>
				<FieldGroup>
					<Controller
						control={control}
						name='theme'
						render={({ field }) => (
							<Field>
								<FieldLabel className='sr-only'>
									Оберіть тему
								</FieldLabel>

								<Select
									value={field.value}
									onValueChange={value => {
										field.onChange(
											value
										)
										setTheme(value)
									}}
								>
									<SelectTrigger>
										<SelectValue placeholder='Оберіть тему' />
									</SelectTrigger>

									<SelectContent>
										<SelectItem value='system'>
											Системна
										</SelectItem>

										<SelectItem value='light'>
											Світла
										</SelectItem>

										<SelectItem value='dark'>
											Темна
										</SelectItem>
									</SelectContent>
								</Select>
							</Field>
						)}
					/>
				</FieldGroup>
			</div>
		</div>
	)
}
