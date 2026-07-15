'use client'

import { motion } from 'motion/react'
import { useState } from 'react'

import { Menu } from '../ui/navbar-menu'

export const staticLinks = [
	{ title: 'Курси', href: '/courses' },
	{ title: 'Про мене', href: '/about' },
	{ title: 'Підписка', href: '/subscription' }
]

export function MotionLink({
	index,
	title,
	href,
	hovered,
	setHovered,
	setActive
}: any) {
	return (
		<a
			onMouseEnter={() => setHovered(index)}
			onMouseMove={() => setActive(null)}
			className='hover:text-foreground/80 text-foreground/60 relative px-4 py-2 transition-colors'
			href={href}
		>
			{hovered === index && (
				<motion.div
					layoutId='hovered-nav-links'
					className='absolute inset-0 h-full w-full rounded-full bg-gray-100 dark:bg-zinc-800'
				/>
			)}
			<span className='relative z-20 text-[14px]'>{title}</span>
		</a>
	)
}

export function NavbarLinks() {
	const [active, setActive] = useState<string | null>(null)
	const [hovered, setHovered] = useState<number | null>(null)

	return (
		<Menu setActive={setActive}>
			<motion.div
				className='flex'
				onMouseLeave={() => setHovered(null)}
			>
				{staticLinks.map((link, i) => (
					<MotionLink
						key={`${link.href}-${i}`}
						index={i + 2}
						title={link.title}
						href={link.href}
						hovered={hovered}
						setHovered={setHovered}
						setActive={setActive}
					/>
				))}
			</motion.div>
		</Menu>
	)
}
