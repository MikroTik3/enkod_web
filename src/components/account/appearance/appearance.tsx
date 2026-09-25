'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTheme } from 'next-themes'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'

import { Field, FieldGroup, FieldLabel } from '../../ui/field'

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
									<SelectTrigger className='h-10! rounded-2xl'>
										<SelectValue placeholder='Оберіть тему' />
									</SelectTrigger>

									<SelectContent side='bottom' position='popper' className='w-20'>
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
	)
}
