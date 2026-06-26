import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'

import { ConfirmDialog } from '@/components/shared/confirm-dialog'

import { Button } from '../../ui/button'

import { useUnlinkAccount } from '@/api/hooks'

interface UnlinkProviderProps {
	provider: string
}

export function UnlinkProvider({ provider }: UnlinkProviderProps) {
	const [isOpen, setIsOpen] = useState(false)

	const queryClient = useQueryClient()

	const { mutate, isPending } = useUnlinkAccount({
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['sso status']
			})
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
			title={`Вимкнути ${provider.charAt(0).toUpperCase() + provider.slice(1)}`}
			description={`Ви впевнені, що хочете вимкнути обліковий запис? ${provider.charAt(0).toUpperCase() + provider.slice(1)}? Після цього ви не зможете входити за його допомогою.`}
			confirmText='Відключити'
			destructive
			handleConfirm={() => mutate({ provider })}
			isLoading={isPending}
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			<Button variant='outline'>Відключити</Button>
		</ConfirmDialog>
	)
}
