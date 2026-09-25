'use client'

import {
	IconChartArea,
	IconChevronRight,
	IconCrown,
	IconLink,
	IconLock,
	IconPalette,
	IconPhone,
	IconSettings,
	IconUser
} from '@tabler/icons-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { ROUTES } from '@/constants'
import { useGetSessions } from '@/api/hooks'

type NavLink = {
	title: string
	href: string
	icon: React.ComponentType<{ className?: string }>
	iconBg: string
	rightText?: number
}

type NavGroup = {
	id: string
	links: NavLink[]
}

export function UserNavigation() {
	const pathname = usePathname()

	const { data, isLoading } = useGetSessions()

	const linkGroups: NavGroup[] = [
		{
			id: 'main',
			links: [
				{
					title: 'Мій профіль',
					href: ROUTES.ACCOUNT.PROFILE,
					icon: IconUser,
					iconBg: 'from-red-400 to-red-600 ring-offset-red-500'
				},
				{
					title: 'Мій прогрес',
					href: ROUTES.ACCOUNT.PROGRESS,
					icon: IconChartArea,
					iconBg: 'from-blue-400 to-blue-600 ring-offset-blue-500'
				}
			]
		},
		{
			id: 'account',
			links: [
				{
					title: 'Налаштування акаунта',
					href: ROUTES.ACCOUNT.SETTINGS,
					icon: IconSettings,
					iconBg: 'from-neutral-400 to-neutral-600 ring-offset-neutral-500'
				},
				{
					title: 'Приватність і безпека',
					href: `${ROUTES.ACCOUNT.PRIVACY}`,
					icon: IconLock,
					iconBg: 'from-sky-400 to-sky-600 ring-offset-sky-500'
				},
				{
					title: 'Пристрої',
					href: ROUTES.ACCOUNT.SESSIONS,
					icon: IconPhone,
					iconBg: 'from-orange-400 to-orange-600 ring-offset-orange-500',
					rightText: data?.length
				},
				{
					title: "Пов'язані акаунти",
					href: ROUTES.ACCOUNT.CONNECTIONS,
					icon: IconLink,
					iconBg: 'from-purple-400 to-purple-600 ring-offset-purple-500'
				}
			]
		},
		{
			id: 'appearance',
			links: [
				{
					title: 'Підписка',
					href: `${ROUTES.SUBSCRIPTION}`,
					icon: IconCrown,
					iconBg: 'from-amber-400 to-amber-600 ring-offset-amber-500'
				},
				{
					title: 'Зовнішній вигляд',
					href: `${ROUTES.ACCOUNT.APPEARANCE}`,
					icon: IconPalette,
					iconBg: 'from-cyan-400 to-cyan-600 ring-offset-cyan-500'
				}
			]
		}
	]

	return (
		<div className='flex flex-col gap-4 py-2'>
			{linkGroups.map((group) => (
				<div key={group.id} className='grid gap-0.5'>
					{group.links.map((link) => {
						const key = `${group.id}-${link.href}`

						const isActive =
							link.href === ROUTES.ACCOUNT.PROGRESS
								? pathname === link.href
								: pathname.startsWith(link.href)

						return (
							<Link
								key={key}
								href={link.href}
								className={`group/sidebar relative flex h-10 items-center gap-2 rounded-md px-4 text-foreground/60 transition-colors hover:bg-gray-100 hover:text-foreground/80 dark:hover:bg-zinc-800 ${
									isActive
										? 'bg-gray-100 text-foreground/80 dark:bg-zinc-800'
										: ''
								}`}
							>
								<div
									className={`relative flex aspect-square items-center justify-center rounded-sm align-middle shadow-lg ring-1 ring-white/20 ring-offset-2 ring-inset size-7 bg-linear-to-b ${link.iconBg}`}
								>
									<link.icon className='relative z-20 size-4.5 shrink-0 text-white' />
								</div>

								<span className='relative z-20 flex-1 text-[14px] whitespace-pre'>
									{link.title}
								</span>

								{link.rightText && (
									<span className='relative z-20 text-[13px] text-muted-foreground'>
										{link.rightText}
									</span>
								)}

								<IconChevronRight className='relative z-20 size-4 shrink-0 text-muted-foreground/60' />
							</Link>
						)
					})}
				</div>
			))}

			<div className='mt-2 px-4 text-xs text-muted-foreground'>
				v1.0.0
			</div>
		</div>
	)
}