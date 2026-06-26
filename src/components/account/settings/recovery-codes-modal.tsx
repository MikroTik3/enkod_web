'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { Download, RotateCcw, TriangleAlert } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { Alert, AlertDescription, AlertTitle } from '../../ui/alert'
import { Button } from '../../ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
	DialogTrigger
} from '../../ui/dialog'
import { Separator } from '../../ui/separator'

import { fetchRecovery, regenerateRecovery } from '@/api/requests'

export function RecoveryCodesModal() {
	const [isOpen, setIsOpen] = useState(false)

	const { data, refetch } = useQuery({
		queryKey: ['fetch recovery codes'],
		queryFn: () => fetchRecovery(),
		enabled: isOpen
	})

	const { mutate: regenerate, isPending } = useMutation({
		mutationKey: ['regenerate recovery codes'],
		mutationFn: () => regenerateRecovery(),
		onSuccess() {
			refetch()
		},
		onError(error: any) {
			toast.error(
				error.response?.data?.message ??
					'Помилка при генерації нових кодів'
			)
		}
	})

	function splitArrayIntoColumns(arr: string[]) {
		if (!arr || arr.length === 0) return [[], [], []]

		const mid = Math.ceil(arr.length / 3)
		const first = arr.slice(0, mid)
		const second = arr.slice(mid, mid * 2)
		const third = arr.slice(mid * 2)

		return [first, second, third]
	}

	function handleDownload() {
		const recoveryCodesText = data?.join('\n')

		const blob = new Blob([recoveryCodesText!], { type: 'text/plain' })
		const fileURL = window.URL.createObjectURL(blob)
		const link = document.createElement('a')

		link.href = fileURL
		link.setAttribute('download', 'mnclimate_recovery_codes.txt')

		document.body.appendChild(link)
		link.click()

		setTimeout(() => window.URL.revokeObjectURL(fileURL), 0)
	}

	const recoveryCodes = data ? splitArrayIntoColumns(data) : [[], [], []]

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant='outline'>Переглянути</Button>
			</DialogTrigger>
			<DialogContent className='w-[500px]'>
				<DialogTitle>Коди відновлення</DialogTitle>
				<DialogDescription>
					Ці коди допоможуть вам отримати доступ до
					облікового запису, якщо ви втратите доступ до
					пристрою і не зможете отримувати коди двофакторної
					аутентифікації.
				</DialogDescription>
				<Alert variant='warning'>
					<TriangleAlert className='size-5 dark:text-yellow-500' />
					<AlertTitle className='ml-1.5'>
						Будь ласка, зберігайте їх у безпечному
						місці.
					</AlertTitle>
					<AlertDescription className='ml-1.5'>
						Вони — останній спосіб відновлення доступу
						до облікового запису.
					</AlertDescription>
				</Alert>
				<div className='flex justify-center gap-10'>
					<div className='flex flex-col'>
						{recoveryCodes[0].map((code, index) => (
							<p
								key={index}
								className='text-[17px] font-medium'
							>
								{code}
							</p>
						))}
					</div>
					<div className='flex flex-col'>
						{recoveryCodes[1].map((code, index) => (
							<p
								key={index}
								className='text-[17px] font-medium'
							>
								{code}
							</p>
						))}
					</div>
					<div className='flex flex-col'>
						{recoveryCodes[2].map((code, index) => (
							<p
								key={index}
								className='text-[17px] font-medium'
							>
								{code}
							</p>
						))}
					</div>
				</div>
				<Separator />
				<DialogFooter>
					<Button
						variant='outline'
						className='h-9'
						onClick={() => regenerate()}
						disabled={isPending}
					>
						<RotateCcw className='size-3' />
						Скинути
					</Button>
					<Button className='h-9' onClick={handleDownload}>
						<Download className='size-3' />
						Завантажити
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
