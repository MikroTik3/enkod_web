'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { LogOut, LucideMenu, Settings } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import { Separator } from '@/components/ui/separator'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetTitle,
	SheetTrigger
} from '@/components/ui/sheet'

import { cookies } from '@/lib/cookie'
import { cn } from '@/lib/utils'

import { Button, buttonVariants } from '../ui/button'

import { staticLinks } from './nav-links'
import { instance } from '@/api/instance'
import { logout } from '@/api/requests'
import { ROUTES } from '@/constants'
import { useAuth } from '@/hooks'

export default function MobileTrigger() {
	const [isOpen, setIsOpen] = useState(false)

	const router = useRouter()

	const { isAuthorized } = useAuth()

	const { mutate } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => logout(),
		onSuccess() {
			cookies.remove('token')

			delete instance.defaults.headers['X-Session-Token']

			setIsOpen(false)
			router.push(ROUTES.AUTH.LOGIN())
		},
		onError(error: any) {
			toast.error(
				error.response?.data?.message ?? 'Помилка при виході'
			)
		}
	})

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger className='lg:hidden'>
				<div
					className={cn(
						buttonVariants({
							variant: 'outline',
							size: 'icon'
						}),
						'[&_svg] text-muted-foreground relative size-8 rounded-xl'
					)}
				>
					<LucideMenu />
					<span className='sr-only'>Відкрити меню</span>
				</div>
			</SheetTrigger>

			<SheetContent
				className='no-scrollbar z-[10000] flex flex-col gap-0 overflow-y-auto'
				side='left'
			>
				<div className='flex flex-col p-3'>
					<SheetTitle className='text-foreground text-lg font-semibold'>
						<SheetTrigger asChild>
							<Link href={ROUTES.HOME}>Enkod</Link>
						</SheetTrigger>
					</SheetTitle>
					<SheetDescription className='text-muted-foreground text-[13px] text-pretty whitespace-break-spaces'>
						Сучасний браузер додатків для навчальної
						платформи
					</SheetDescription>
				</div>

				<Separator className='mb-3' />

				<div className='flex flex-col'>
					<div className='no-scrollbar! relative flex h-full flex-col gap-2 px-3 text-sm'>
						{staticLinks.map((link, index) => (
							<SheetTrigger key={index} asChild>
								<Link
									href={link.href}
									key={index}
									className={cn(
										buttonVariants({
											variant: 'ghost'
										}),
										'justify-start'
									)}
								>
									{link.title}
								</Link>
							</SheetTrigger>
						))}
					</div>

					<Separator className='my-3' />

					{isAuthorized ? (
						<div className='flex flex-col gap-2 px-3'>
							<Button
								onClick={() => {
									router.push(
										'/account/settings'
									)
									setIsOpen(false)
								}}
								variant='ghost'
								className='justify-start'
							>
								<Settings />
								Настройки
							</Button>
							<Button
								onClick={() => mutate()}
								variant='ghost'
								className='justify-start text-red-500! bg-red-50!'
							>
								<LogOut />
								Вийти
							</Button>
						</div>
					) : (
						<div className='flex h-full flex-col align-bottom'>
							<div className='flex flex-col gap-2 px-3'>
								<Link
									href='/auth/login'
									className={cn(
										buttonVariants({
											variant: 'outline'
										})
									)}
								>
									Увійти
								</Link>
								<Link
									href='/auth/register'
									className={cn(
										buttonVariants()
									)}
								>
									Реєстрація
								</Link>
							</div>
						</div>
					)}
				</div>
			</SheetContent>
		</Sheet>
	)
}
