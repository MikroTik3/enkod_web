'use client'

import { IconWallet } from '@tabler/icons-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'

import { ConfirmDialog } from '../../shared/confirm-dialog'

import type { AccountResponse } from '@/api/generated'
import { toggleAutoBilling } from '@/api/requests'
import { Card, CardContent } from '@/components/ui/card'
import { ROUTES } from '@/constants'

interface AutoBillingFormProps {
	user: AccountResponse | undefined
}

const rowClassName =
	'flex w-full gap-4 hover:bg-gray-100 dark:hover:bg-accent px-4 py-2 items-center justify-between text-left cursor-pointer outline-none focus-visible:bg-gray-100 dark:focus-visible:bg-accent'

export function AutoBillingForm({ user }: AutoBillingFormProps) {
	const [isOpen, setIsOpen] = useState(false)

	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationKey: ['toggle auto billing', user?.id],
		mutationFn: toggleAutoBilling,
		onSuccess: (data: any) => {
			setIsOpen(false)
			queryClient.invalidateQueries({ queryKey: ['get me'] })
			toast.success(data.response?.data?.message)
		},
		onError: (error: any) => {
			toast.error(
				error.response?.data?.message ??
				'Не вдалося змінити налаштування автоматичного списання'
			)
		}
	})

	const label = (
		<div className='flex gap-x-2 items-center'>
			<div className='relative flex aspect-square items-center justify-center rounded-sm align-middle shadow-lg ring-1 ring-white/20 ring-offset-2 ring-inset size-7 bg-linear-to-b from-green-400 to-green-600 ring-offset-green-500'>
				<IconWallet className='size-4 text-white' />
			</div>
			<h2>Автоматическое списание</h2>
		</div>
	)

	const action = (text: string) => (
		<div className='flex items-center'>
			<span className='text-muted-foreground'>{text}</span>
			<ChevronRight className='size-5 text-muted-foreground' />
		</div>
	)

	return (
		<div className='flex flex-col gap-y-3'>
			<Card className='py-0 shadow-none rounded-4xl'>
				<CardContent className='p-0'>
					{user?.isAutoBilling ? (
						<ConfirmDialog
							open={isOpen}
							onOpenChange={setIsOpen}
							title='Вимкнення автоматичних списань'
							description='Ви впевнені, що хочете вимкнути автоматичне списання? Передплата залишатиметься активною до кінця оплаченого періоду.'
							handleConfirm={mutate}
						>
							<button
								type='button'
								onClick={() => setIsOpen(true)}
								className={rowClassName}
							>
								{label}
								{action('Вимкнути')}
							</button>
						</ConfirmDialog>
					) : (
						<Link href={ROUTES.SUBSCRIPTION} className={rowClassName}>
							{label}
							{action('Увiмкнути')}
						</Link>
					)}
				</CardContent>
			</Card>

			<p className='px-1 text-sm leading-5 text-muted-foreground'>
				Ежемесячно плата списывается автоматически.
				Автопродление можно отключить в любой
				момент.
			</p>
		</div>
	)
}