'use client'

import { AlertTriangle } from 'lucide-react'
import type { Route } from 'next'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Button } from '../../ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '../../ui/card'

export function ConnectionError() {
	const [isVisible, setIsVisible] = useState(false)
	const [errorInfo, setErrorInfo] = useState<{
		title: string
		description: string
		details: string
	} | null>(null)

	const searchParams = useSearchParams()
	const router = useRouter()

	useEffect(() => {
		const error = searchParams.get('error')

		if (error === 'already-linked') {
			setErrorInfo({
				title: "Акаунт вже прив'язаний",
				description:
					"Цей аккаунт уже прив'язаний до іншого користувача.",
				details: "Будь ласка, використовуйте інший аккаунт або зв'яжіться з підтримкою за адресою support@teacoder.ru, щоб вирішити цю проблему."
			})
			setIsVisible(true)
		} else if (error === 'email-taken') {
			setErrorInfo({
				title: 'Почта вже використовується',
				description:
					'Вказану пошту вже використовує інший аккаунт.',
				details: 'Спробуйте використати інший адрес електронної пошти або відновити доступ до старого аккаунту.'
			})
			setIsVisible(true)
		} else if (error === 'access_denied') {
			setErrorInfo({
				title: 'Доступ заборонено',
				description:
					'Ви скасували авторизацію через зовнішнього провайдера',
				details: "Якщо це було випадково, спробуйте знову. Інакше використовуйте інший спосіб входу або зв'яжіться з підтримкою."
			})
			setIsVisible(true)
		}
	}, [searchParams])

	const handleClose = () => {
		setIsVisible(false)

		const params = new URLSearchParams(searchParams.toString())

		params.delete('error')

		router.replace(
			`${window.location.pathname}?${params.toString()}` as any as Route,
			{
				scroll: false
			}
		)
	}

	if (!isVisible || !errorInfo) return null

	return (
		<div className='bg-background/80 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm'>
			<Card className='animate-in fade-in zoom-in w-full max-w-md shadow-lg duration-300'>
				<CardHeader className='border-border border-b pb-4'>
					<div className='flex items-center gap-2'>
						<AlertTriangle className='h-6 w-6' />
						<CardTitle>{errorInfo.title}</CardTitle>
					</div>
					<CardDescription>
						{errorInfo.description}
					</CardDescription>
				</CardHeader>
				<CardContent className='space-y-4 pt-6'>
					<div className='bg-muted rounded-md p-3 text-sm'>
						<p>{errorInfo.details}</p>
					</div>
				</CardContent>
				<CardFooter className='border-border border-t pt-4'>
					<Button className='w-full' onClick={handleClose}>
						Зрозуміло
					</Button>
				</CardFooter>
			</Card>
		</div>
	)
}
