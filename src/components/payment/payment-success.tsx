'use client'

import { IconCircleCheck, IconHome } from '@tabler/icons-react'
import confetti from 'canvas-confetti'
import Link from 'next/link'
import { useEffect } from 'react'

import { buttonVariants } from '@/components/ui/button'

import { cn } from '@/lib/utils'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '../ui/card'

import { ROUTES } from '@/constants'

export function PaymentSuccess() {
	useEffect(() => {
		const duration = 5 * 1000
		const animationEnd = Date.now() + duration
		const defaults = {
			startVelocity: 30,
			spread: 360,
			ticks: 60,
			zIndex: 0
		}

		const randomInRange = (min: number, max: number) =>
			Math.random() * (max - min) + min

		const interval = window.setInterval(() => {
			const timeLeft = animationEnd - Date.now()
			if (timeLeft <= 0) return clearInterval(interval)

			const particleCount = 50 * (timeLeft / duration)

			confetti({
				...defaults,
				particleCount,
				origin: {
					x: randomInRange(0.1, 0.3),
					y: Math.random() - 0.2
				}
			})

			confetti({
				...defaults,
				particleCount,
				origin: {
					x: randomInRange(0.7, 0.9),
					y: Math.random() - 0.2
				}
			})
		}, 250)

		return () => clearInterval(interval)
	}, [])

	return (
		<div className='bg-background relative flex min-h-screen items-center justify-center overflow-hidden p-4'>
			<Card className='bg-card w-full max-w-md gap-10 rounded-2xl border-0'>
				<CardHeader className='space-y-3 text-center'>
					<div className='mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100 text-zinc-600'>
						<IconCircleCheck size={32} />
					</div>

					<CardTitle className='flex items-center justify-center gap-2 text-2xl'>
						Оплата пройшла успішно!
					</CardTitle>

					<CardDescription>
						Дякуємо за покупку! Тепер ви маєте доступ до
						всіх преміум-матеріалів.
					</CardDescription>
				</CardHeader>

				<CardContent className='flex flex-col items-center px-3 text-center'>
					<Link
						className={cn(
							buttonVariants({ size: 'lg' }),
							'flex w-full items-center gap-2'
						)}
						href={ROUTES.HOME}
					>
						<IconHome size={18} />
						Повернутися на головну
					</Link>
				</CardContent>
			</Card>
		</div>
	)
}
