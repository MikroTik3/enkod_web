'use client'

import { IconCircleCheckFilled } from '@tabler/icons-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useGetMe, useInitializeSubscription } from '@/api/hooks'
import { ROUTES } from '@/constants'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'

export default function Subscription() {
	const [mounted, setMounted] = useState(false)

	const { isAuthorized } = useAuth()
	const router = useRouter()

	const { mutate } = useInitializeSubscription({
		onSuccess: (data) => {
			router.push(data.pageUrl)
		},
		onError: (error: any) => {
			toast.error(error.response?.data?.message ?? 'Помилка при оплатi')
		}
	})


	useEffect(() => {
		setMounted(true)
	}, [])

	const { data: user, isLoading } = useGetMe({
		enabled: isAuthorized
	})

	const onSubmit = () => {
		mutate({  })
	}

	return (
		<section
			id='subscription'
			className='mx-auto max-w-335 px-4 pt-24 pb-16 md:pt-36 md:pb-24'
		>
			<div className='flex flex-col items-center gap-20'>
				<div className='flex flex-col items-center gap-2 text-center'>
					<h2 className='text-2xl tracking-tight text-balance text-neutral-700 md:text-4xl lg:text-5xl dark:text-neutral-300'>
						Отримайте доступ до всіх курсів
					</h2>
					<p className='text-center text-sm text-neutral-600 md:text-base lg:text-lg dark:text-neutral-400'>
						Одна підписка відкриває повний доступ до
						всіх матеріалів платформи - від основ{' '}
						<br className='hidden md:block' />{' '}
						веброзробки до сучасних технологій Frontend.
					</p>
				</div>

				<div className='max-w-100 overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 dark:border-neutral-800 dark:bg-neutral-900'>
					<div className='flex h-full flex-col justify-start gap-4'>
						<div className='shadow-input rounded-2xl bg-white p-4 dark:bg-neutral-800 dark:shadow-[0px_-1px_0px_0px_var(--neutral-700)]'>
							<div className='flex items-start justify-between'>
								<div className='flex flex-col gap-2'>
									<p className='text-lg font-medium text-black dark:text-white'>
										Місячний доступ
									</p>
									<span className='inline-block rounded-md text-xs tracking-tight text-neutral-600 dark:text-neutral-200'>
										Місячна оплата
									</span>
								</div>
							</div>
							<div className='mt-8'>
								<div className='flex items-end'>
									<span className='text-lg font-bold text-neutral-500 dark:text-neutral-200'>
										₴
									</span>
									<div className='flex items-baseline gap-2'>
										<span className='text-3xl font-bold text-neutral-800 md:text-5xl dark:text-neutral-50'>
											275
										</span>
										<div className='flex flex-col'>
											<span className='text-lg font-bold text-gray-500 line-through dark:text-neutral-200'>
												₴359
											</span>
										</div>
									</div>
								</div>
							</div>

							<Button 
								className='mt-10 w-full'
								onClick={() => {
									if (!isAuthorized) {
										return router.push(
											ROUTES.AUTH.LOGIN(ROUTES.SUBSCRIPTION)
										)
									}

									onSubmit()
								}}
								isLoading={mounted && isLoading}
								disabled={mounted && (user?.isPremium || isLoading)}
							>
								{user?.isPremium
									? 'У вас уже є підписка'
									: 'Оплатити'}
							</Button>
						</div>
						<div className='mt-1 p-4'>
							{[
								'Повний доступ до всіх курсів та вихідного коду проєктів',
								'React, Next.js, Nest.js та сучасний Frontend стек',
								'Реальні проєкти для портфоліо',
								'Регулярні оновлення та нові матеріали',
								'Навчання у власному темпі без обмежень'
							].map((text, i) => (
								<div
									key={i}
									className='my-4 flex items-start gap-2'
								>
									<div className='mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full'>
										<IconCircleCheckFilled className='size-5 stroke-[4px] text-neutral-900' />
									</div>
									<div className='text-sm font-medium text-black dark:text-white'>
										{text}
									</div>
								</div>
							))}
						</div>
						<div className='p-4'></div>
					</div>
					<div className='p-4'>
						<Link
							href='https://t.me/d16ddd348'
							target="_blank"
							className='w-full text-left text-sm text-neutral-500 hover:underline dark:text-neutral-200'
						>
							Питання? Напишіть менi
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}
