import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import { ConfirmDialog } from '@/components/shared/confirm-dialog'

import { cookies } from '@/lib/cookie'

import { Button } from '../../ui/button'
import { Card, CardContent } from '../../ui/card'

import { useLogout } from '@/api/hooks'
import { instance } from '@/api/instance'
import { ROUTES } from '@/constants'

export function AccountActions() {
	const [isOpen, setIsOpen] = useState(false)

	const { push } = useRouter()

	const { mutate } = useLogout({
		onSuccess() {
			cookies.remove('token')

			delete instance.defaults.headers['X-Session-Token']

			setIsOpen(false)
			push(ROUTES.AUTH.LOGIN())
		},
		onError(error: any) {
			toast.error(
				error.response?.data?.message ?? 'Помилка при виході'
			)
		}
	})

	return (
		<div className='flex flex-col gap-y-3 pb-10'>
			<h2 className='text-[19px] font-medium'>Дії</h2>
			<Card className='border-rose-500 bg-red-100 py-0 shadow-none'>
				<CardContent className='p-4'>
					<div className='space-y-8'>
						<div className='flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0'>
							<div className='mr-5'>
								<h2 className='font-semibold'>
									Вихід
								</h2>
								<p className='text-muted-foreground text-sm'>
									Завершіть сеанс, щоб вийти
									з аккаунта на цьому
									пристрої.
								</p>
							</div>
							<ConfirmDialog
								open={isOpen}
								onOpenChange={setIsOpen}
								title='Вихід з аккаунта'
								description='Ви впевнені, що хочете завершити сеанс і вийти з аккаунта?'
								handleConfirm={() => mutate()}
							>
								<Button variant='destructive'>
									Вийти
								</Button>
							</ConfirmDialog>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
