'use client'

import { ChevronDownIcon } from 'lucide-react'
import { motion, spring } from 'motion/react'
import Link from 'next/link'
import React from 'react'

const transition = {
	type: spring,
	mass: 0.5,
	damping: 11.5,
	stiffness: 100,
	restDelta: 0.001,
	restSpeed: 0.001
}

export const MenuItem = ({
	setActive,
	setHovered,
	hovered,
	active,
	item,
	children
}: {
	setActive: (item: string) => void
	setHovered: (item: number) => void
	hovered: number | null
	active: string | null
	item: string
	children?: React.ReactNode
}) => {
	return (
		<div className='relative'>
			<motion.div
				onMouseEnter={() => setActive(item)}
				onMouseLeave={() => setHovered(1)}
			>
				<div
					onMouseEnter={() => setHovered(1)}
					className='hover:text-foreground/80 text-foreground/60 relative flex h-10 items-center px-4 py-2'
					key={1}
				>
					{hovered === 1 && (
						<motion.div
							layoutId='hovered-nav-links'
							className='absolute inset-0 h-full w-full rounded-full bg-gray-100'
						/>
					)}
					<span className='relative z-20 text-[14px]'>
						{item}
					</span>
					<ChevronDownIcon
						className={`relative top-[1px] z-100 ml-1 size-3 transition-transform duration-300 ${
							active ? 'rotate-180' : ''
						}`}
						aria-hidden='true'
					/>
				</div>
			</motion.div>
			{active !== null && (
				<motion.div
					initial={{ opacity: 0, scale: 0.85, y: 10 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					transition={transition}
				>
					{active === item && (
						<div className='absolute top-[calc(100%_+_0rem)] left-1/2 -translate-x-1/2 transform pt-5'>
							<motion.div
								transition={transition}
								layoutId='active' // layoutId ensures smooth animation
								className='overflow-hidden rounded-2xl border border-black/[0.2] bg-white shadow-xl backdrop-blur-sm dark:border-white/[0.2] dark:bg-black'
							>
								<motion.div
									layout // layout ensures smooth animation
									className='h-full w-max p-2'
								>
									{children}
								</motion.div>
							</motion.div>
						</div>
					)}
				</motion.div>
			)}
		</div>
	)
}

export const Menu = ({
	setActive,
	children
}: {
	setActive: (item: string | null) => void
	children: React.ReactNode
}) => {
	return (
		<nav
			onMouseLeave={() => setActive(null)}
			className='shadow-input relative hidden justify-center space-x-4 rounded-full lg:flex'
		>
			{children}
		</nav>
	)
}

export const NavbarItem = ({
	title,
	description,
	href,
	icon
}: {
	title: string
	description: string
	href: string
	icon: React.ReactNode
}) => {
	return (
		<Link
			href={href}
			className='group text-muted-foreground flex w-[248px] cursor-pointer items-center gap-3 rounded-md p-3 text-[14px]'
		>
			<div className='relative grid place-content-center'>
				<div className='border-border text-muted-foreground flex size-8 items-center justify-center rounded-sm border bg-white transition-colors duration-200 group-hover:bg-black group-hover:text-white'>
					{icon}
				</div>
			</div>
			<div className='flex flex-col'>
				<div className='mb-0.5 flex items-center leading-5 font-semibold whitespace-nowrap text-black'>
					{title}
				</div>
				<p className='text-muted-foreground h-4 text-[12px] whitespace-nowrap transition-all duration-200 group-hover:text-black'>
					{description.length > 23
						? description.slice(0, 23).concat('...')
						: description}
				</p>
			</div>
		</Link>
	)
}
