'use client'

import { useMutation } from '@tanstack/react-query'
import {
	Apple,
	BookOpen,
	ChartArea,
	Gem,
	LogOut,
	Menu,
	Settings,
	UserRound,
	X,
	type LucideIcon
} from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import { instance } from '@/api/instance'
import { logout } from '@/api/requests'
import { useGetMe } from '@/api/hooks'
import { ROUTES } from '@/constants'
import { useAuth } from '@/hooks'
import { cookies } from '@/lib/cookie'
import { cn } from '@/lib/utils'

import { Button, buttonVariants } from '../ui/button'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetTitle,
	SheetTrigger
} from '../ui/sheet'

import { staticLinks } from './nav-links'

const NAV_ICONS: Record<string, LucideIcon> = {
	[ROUTES.COURSES.ROOT]: BookOpen,
	[ROUTES.ABOUT]: UserRound,
	[ROUTES.SUBSCRIPTION]: Apple
}

interface DrawerLinkProps {
	href: string
	title: string
	icon: LucideIcon
	isActive: boolean
}

function DrawerLink({
	href,
	title,
	icon: Icon,
	isActive
}: DrawerLinkProps) {
	return (
		<SheetClose asChild>
			<Link
				href={href}
				aria-current={isActive ? 'page' : undefined}
				className={cn(
					'flex h-12 items-center gap-3.5 rounded-2xl px-4 text-[15px] transition-colors',
					isActive
						? 'bg-secondary font-medium text-foreground'
						: 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground'
				)}
			>
				<Icon
					className={cn(
						'size-[18px] shrink-0',
						isActive && 'text-brand'
					)}
				/>

				{title}
			</Link>
		</SheetClose>
	)
}

export default function MobileTrigger() {
	const [isOpen, setIsOpen] = useState(false)

	const router = useRouter()
	const pathname = usePathname()

	const { isAuthorized } = useAuth()
	const { data: user } = useGetMe()

	const { mutate: handleLogout, isPending } = useMutation({
		mutationKey: ['logout'],
		mutationFn: logout,

		onSuccess() {
			cookies.remove('token')

			delete instance.defaults.headers['X-Session-Token']

			setIsOpen(false)
			router.push(ROUTES.AUTH.LOGIN())
		},

		onError(error: any) {
			toast.error(
				error.response?.data?.message ??
					'Помилка під час виходу'
			)
		}
	})

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger asChild>
				<div
					className={cn(
						buttonVariants({
							variant: 'outline',
							size: 'icon'
						}),
						'[&_svg] text-muted-foreground relative size-8 rounded-xl'
					)}
				>
					<Menu />
					<span className='sr-only'>Відкрити меню</span>
				</div>
			</SheetTrigger>

			<SheetContent
				side='right'
				showCloseButton={false}
				className='flex w-[88%] max-w-[360px] flex-col gap-0 rounded-l-4xl border-none p-0 sm:max-w-[360px]'
			>
				<div className='flex h-16 shrink-0 items-center justify-between pr-3 pl-6'>
					<SheetTitle asChild>
						<span className='flex items-center gap-2.5 text-lg font-semibold tracking-tight'>
							Enkod
						</span>
					</SheetTitle>

					<SheetDescription className='sr-only'>
						Навігація платформою
					</SheetDescription>

					<SheetClose asChild>
						<Button
							variant='ghost'
							size='icon'
							className='size-10 rounded-full [&_svg]:size-5'
						>
							<X />

							<span className='sr-only'>
								Закрити меню
							</span>
						</Button>
					</SheetClose>
				</div>

				<div className='min-h-0 flex-1 overflow-y-auto px-3 pt-2 pb-4'>
					{isAuthorized && user && (
						<div className='mb-6'>
							<SheetClose asChild>
								<Link
									href={ROUTES.ACCOUNT.ROOT}
									className='flex items-center gap-3 rounded-2xl bg-secondary p-3.5 transition-colors hover:bg-secondary/80'
								>
									<div className='min-w-0 flex-1'>
										<p className='truncate font-medium'>
											{user.displayName}
										</p>

										{user.email && (
											<p className='truncate text-sm text-muted-foreground'>
												{user.email}
											</p>
										)}
									</div>

									{user.isPremium && (
										<Gem
											aria-label='Преміум'
											className='size-4 shrink-0 text-brand'
										/>
									)}
								</Link>
							</SheetClose>
						</div>
					)}

					<nav aria-label='Основна навігація'>
						<p className='mb-2 px-4 eyebrow'>
							Платформа
						</p>

						<div className='space-y-1'>
							{staticLinks.map(link => (
								<DrawerLink
									key={link.href}
									href={link.href}
									title={link.title}
									icon={
										NAV_ICONS[link.href] ??
										BookOpen
									}
									isActive={
										pathname === link.href ||
										pathname.startsWith(
											`${link.href}/`
										)
									}
								/>
							))}
						</div>
					</nav>

					{isAuthorized && (
						<nav
							aria-label='Розділи акаунта'
							className='mt-6'
						>
							<p className='mb-2 px-4 eyebrow'>
								Акаунт
							</p>

							<div className='space-y-1'>
								<DrawerLink
									href={
										ROUTES.ACCOUNT.PROFILE
									}
									title='Мій профіль'
									icon={UserRound}
									isActive={
										pathname ===
										ROUTES.ACCOUNT.PROFILE
									}
								/>

								<DrawerLink
									href={
										ROUTES.ACCOUNT.PROGRESS
									}
									title='Мій прогрес'
									icon={ChartArea}
									isActive={
										pathname ===
										ROUTES.ACCOUNT.PROGRESS
									}
								/>

								<DrawerLink
									href={
										ROUTES.ACCOUNT.SETTINGS
									}
									title='Налаштування акаунта'
									icon={Settings}
									isActive={
										pathname ===
										ROUTES.ACCOUNT.SETTINGS
									}
								/>
							</div>
						</nav>
					)}
				</div>

				<div className='shrink-0 border-t border-border p-4 pb-[max(1rem,env(safe-area-inset-bottom))]'>
					{isAuthorized ? (
						<Button
							type='button'
							variant='outline'
							size='lg'
							disabled={isPending}
							className='w-full text-destructive hover:text-destructive'
							onClick={() => handleLogout()}
						>
							<LogOut />

							{isPending
								? 'Вихід...'
								: 'Вийти'}
						</Button>
					) : (
						<div className='grid gap-2.5'>
                                                 <Button size='lg' asChild>
                                                        <SheetClose asChild>
                                                               <Link
                                                                      href={
                                                                             ROUTES.AUTH.REGISTER
                                                                      }
                                                               >
                                                                      Реєстрація
                                                               </Link>
                                                        </SheetClose>
                                                 </Button>

                                                 <Button
                                                        variant='outline'
                                                        size='lg'
                                                        asChild
                                                 >
                                                        <SheetClose asChild>
                                                               <Link
                                                                      href={ROUTES.AUTH.LOGIN()}
                                                               >
                                                                      Увійти
                                                               </Link>
                                                        </SheetClose>
                                                 </Button>
						</div>
					)}
				</div>
			</SheetContent>
		</Sheet>
	)
}