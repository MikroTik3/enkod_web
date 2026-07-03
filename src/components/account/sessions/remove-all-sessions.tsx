import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'

import { ConfirmDialog } from '@/components/shared/confirm-dialog'

import { Button } from '../../ui/button'

import { useRemoveAllSessions } from '@/api/hooks'

export function RemoveAllSessions() {
	const [isOpen, setIsOpen] = useState(false)

	const queryClient = useQueryClient()

	const { mutate, isPending } = useRemoveAllSessions({
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['get sessions'] })
			setIsOpen(false)
		},
		onError(error: any) {
			toast.error(
				error.response?.data?.message ??
					'Помилка при відключенні'
			)
		}
	})

	return (
		<ConfirmDialog
			title='Вийти з усіх пристроїв?'
			description='Ви будете розлогінені на всіх пристроях, крім поточного. Ви впевнені, що хочете продовжити?'
			confirmText='Видалити всі сесії'
			destructive
			handleConfirm={() => mutate()}
			isLoading={isPending}
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			<Button>
				Вийти на всіх пристроях
			</Button>
		</ConfirmDialog>
	)
}
