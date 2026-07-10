'use client'

import { motion } from 'motion/react'
import * as React from 'react'

import { cn } from '@/lib/utils'

type Tab = {
	title: string
	value: string
	content?: React.ReactNode
}

type TabsProps = {
	tabs: Tab[]
	activeTab: string
	setActiveTab: React.Dispatch<React.SetStateAction<string>>
	containerClassName?: string
	activeTabClassName?: string
	tabClassName?: string
	contentClassName?: string
}

export function Tabs({
	tabs,
	activeTab,
	setActiveTab,
	containerClassName,
	activeTabClassName,
	tabClassName,
	contentClassName
}: TabsProps) {
	const active =
		tabs.find(tab => tab.value === activeTab) ?? tabs[0]

	return (
		<>
			<div
				className={cn(
					'no-visible-scrollbar bg-gray-100 relative flex w-max items-center gap-2 overflow-auto rounded-full border p-1 sm:overflow-visible',
					containerClassName
				)}
			>
				{tabs.map(tab => (
					<button
						key={tab.value}
						onClick={() => setActiveTab(tab.value)}
						className={cn(
							'relative rounded-full px-4 py-2 text-sm font-medium transition-colors',
							tabClassName
						)}
					>
						{active.value === tab.value && (
							<motion.div
								layoutId='clickedbutton'
								transition={{
									type: 'spring',
									bounce: 0.3,
									duration: 0.6
								}}
								className={cn(
									'absolute inset-0 rounded-full bg-white',
									activeTabClassName
								)}
							/>
						)}

						<span className='relative z-10 whitespace-nowrap'>
							{tab.title}
						</span>
					</button>
				))}
			</div>

			<div className={cn('mt-6 w-full', contentClassName)}>
				{active.content}
			</div>
		</>
	)
}