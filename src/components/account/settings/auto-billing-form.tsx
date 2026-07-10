'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'

import { ConfirmDialog } from '../../shared/confirm-dialog'
import { Button } from '../../ui/button'

import type { AccountResponse } from '@/api/generated'
import { toggleAutoBilling } from '@/api/requests'

interface AutoBillingFormProps {
	user: AccountResponse | undefined
}

export function AutoBillingForm({ user }: AutoBillingFormProps) {
	const [isOpen, setIsOpen] = useState(false)

	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationKey: ['toggle auto billing', user?.id],
		mutationFn: toggleAutoBilling,
		onSuccess: () => {
			setIsOpen(false)
			queryClient.invalidateQueries({ queryKey: ['get me'] })
			toast.success(
				user?.isAutoBilling
					? 'Автоматичні списання вимкнені'
					: 'Автоматичні списання увімкнено'
			)
		},
		onError: (error: any) => {
			toast.error(
				error.response?.data?.message ??
					'Не вдалося змінити налаштування автоматичного списання'
			)
		}
	})

	return (
		<div className='flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0'>
			<div className='mr-5 flex w-full items-start gap-x-4 md:w-auto md:items-center'>
				<div className='flex w-full flex-col'>
					<h2 className='mb-1 font-semibold'>
						Автоматическое списание
					</h2>
					<p className='text-sm text-muted-foreground'>
						Ежемесячно плата списывается автоматически.
						Автопродление можно отключить в любой момент.
					</p>
				</div>
			</div>
			<div>
				{user?.isAutoBilling ? (
					<ConfirmDialog
						open={isOpen}
						onOpenChange={setIsOpen}
						title='Вимкнення автоматичних списань'
						description='Ви впевнені, що хочете вимкнути автоматичне списання? Передплата залишатиметься активною до кінця оплаченого періоду.'
						handleConfirm={mutate}
					>
						<Button
							onClick={() => setIsOpen(true)}
						>
							Вимкнути
						</Button>
					</ConfirmDialog>
				) : (
					<Button onClick={() => mutate()}>
						Увімкнути
					</Button>
				)}
			</div>
		</div>
	)
}