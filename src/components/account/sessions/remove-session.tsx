import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'

import { ConfirmDialog } from '@/components/shared/confirm-dialog'

import { Button } from '../../ui/button'

import { useRevokeSession } from '@/api/hooks'

interface RevokeSessionProps {
	id: string
}

export function RevokeSession({ id }: RevokeSessionProps) {
	const [isOpen, setIsOpen] = useState(false)

	const queryClient = useQueryClient()

	const { mutate, isPending } = useRevokeSession({
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['get sessions'] })
			setIsOpen(false)
		},
		onError(error: any) {
			toast.error(
				error.response?.data?.message ??
					'Помилка при видаленні сесії'
			)
		}
	})

	return (
		<ConfirmDialog
			title='Завершити сеанс на другому пристрої?'
			description='Ви збираєтеся вийти з одного з ваших пристроїв. Ви впевнені, що хочете продовжити?'
			confirmText='Вийти з пристрою'
			destructive
			handleConfirm={() => mutate({ id })}
			isLoading={isPending}
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			<Button className='max-[440px]:w-full'>
				Вийти
			</Button>
		</ConfirmDialog>
	)
}
