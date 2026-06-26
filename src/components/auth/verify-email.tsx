'use client'

import { useMutation } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '../ui/button'

import { AuthWrapper } from './auth-wrapper'
import { verifyEmail } from '@/api/requests'
import { ROUTES } from '@/constants'

export function VerifyEmail() {
	const router = useRouter()
	const { token } = useParams<{ token: string }>()

	const { mutate, isPending } = useMutation({
		mutationKey: ['verify email'],
		mutationFn: () => verifyEmail(token),
		onSuccess() {
			router.push(ROUTES.ACCOUNT.SETTINGS)
		},
		onError(error: any) {
			toast.error(
				error.response?.data?.message ??
					'Помилка при верифікації'
			)
		}
	})

	return (
		<AuthWrapper heading='Верифікація пошти'>
			<p className='text-muted-foreground text-sm'>
				Щоб завершити підтвердження пошти, натисни на кнопку
				нижче.
			</p>
			<Button
				className='mt-5 w-full'
				onClick={() => mutate()}
				isLoading={isPending}
			>
				Продовжити
			</Button>
		</AuthWrapper>
	)
}
