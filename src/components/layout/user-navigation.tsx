'use client'

import {
	IconChartArea,
	IconLink,
	IconPhone,
	IconSettings
} from '@tabler/icons-react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { ROUTES } from '@/constants'

export const links = [
	{
		title: 'Особистий Кабінет',
		href: ROUTES.ACCOUNT.ROOT,
		icon: IconChartArea
	},
	{
		title: 'Налаштування акаунта',
		href: ROUTES.ACCOUNT.SETTINGS,
		icon: IconSettings
	},
	{
		title: 'Пристрої',
		href: ROUTES.ACCOUNT.SESSIONS,
		icon: IconPhone
	},
	{
		title: `Пов'язані акаунти`,
		href: ROUTES.ACCOUNT.CONNECTIONS,
		icon: IconLink
	}
]

export function UserNavigation() {
	const pathname = usePathname()
	const [hovered, setHovered] = useState<number | null>(null)

	return (
		<div className='group flex flex-col gap-4 py-2'>
			<motion.div
				className='grid'
				onMouseLeave={() => setHovered(null)}
			>
				{links.map((link, i) => {
					const isActive = pathname === link.href
					const showBg = hovered === i || isActive

					return (
						<a
							onMouseEnter={() => setHovered(i)}
							className={`hover:text-foreground/80 group/sidebar text-foreground/60 relative flex h-10 items-center gap-1 px-4 py-2 transition-colors`}
							href={link.href}
							key={i}
						>
							{showBg && (
								<motion.div
									layoutId='hovered-user-navigation'
									className='absolute inset-0 h-full w-full rounded-md bg-gray-100 dark:bg-zinc-800'
									transition={{
										type: 'spring',
										stiffness: 300,
										damping: 30
									}}
								/>
							)}
							<link.icon className='relative z-20 h-5 w-5 shrink-0 text-neutral-700' />
							<span className='relative z-20 text-[14px] whitespace-pre transition duration-150 group-hover/sidebar:translate-x-1'>
								{link.title}
							</span>
						</a>
					)
				})}
			</motion.div>
		</div>
	)
}
