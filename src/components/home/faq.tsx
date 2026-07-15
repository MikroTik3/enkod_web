'use client'

import { IconPlus } from '@tabler/icons-react'
import { AnimatePresence, motion } from 'motion/react'
import React, { useEffect, useRef, useState } from 'react'

import {
	GridLineHorizontal,
	GridLineVertical
} from '@/components/ui/grid-lines'

import { cn } from '@/lib/utils'

interface FAQItem {
	question: string
	answer: string
}

interface FAQSection {
	title: string
	items: FAQItem[]
}

const faqData: FAQSection[] = [
	{
		title: 'Про навчання',
		items: [
			{
				question: 'Що я зможу після курсу?',
				answer: 'Після навчання ти зможеш створювати сучасні адаптивні вебсайти, працювати з React, підключати API та робити повноцінні вебдодатки від ідеї до деплою.'
			},
			{
				question: 'Як проходить навчання?',
				answer: 'Навчання побудоване на практиці: ти одразу пишеш код, виконуєш завдання та створюєш реальні проєкти замість сухої теорії.'
			},
			{
				question: 'Чи потрібні попередні знання?',
				answer: 'Ні, курс підходить для початківців. Ми починаємо з основ HTML, CSS і JavaScript та поступово переходимо до складніших технологій.'
			}
		]
	},
	{
		title: 'Формат та підтримка',
		items: [
			{
				question: 'Чи є підтримка під час навчання?',
				answer: 'Так, ти отримуєш підтримку від викладачів і можеш ставити запитання в чаті або під час перевірки завдань.'
			},
			{
				question: 'Чи будуть практичні проєкти?',
				answer: 'Так, ти створиш кілька реальних проєктів для портфоліо, включаючи landing page, React застосунок та fullstack проєкт.'
			},
			{
				question: 'Чи можна навчатися у своєму темпі?',
				answer: 'Так, ти можеш проходити курс у зручному темпі та повертатися до матеріалів у будь-який час.'
			}
		]
	}
]

export function FAQs() {
	const [activeId, setActiveId] = useState<string | null>(null)
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setActiveId(null)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () =>
			document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	const toggleQuestion = (id: string) => {
		setActiveId(activeId === id ? null : id)
	}

	return (
		<section
			id='faq'
			className='mx-auto max-w-335 px-4 py-10 md:px-8 md:py-20 lg:py-32'
		>
			<div className='flex flex-col gap-5'>
				<div className='flex flex-col items-center gap-2 text-center'>
					<h2 className='text-2xl tracking-tight text-balance text-neutral-700 md:text-4xl lg:text-5xl dark:text-neutral-300'>
						Поширені запитання
					</h2>

					<p className='text-sm text-neutral-600 md:text-base lg:text-lg dark:text-neutral-400'>
						Все, що потрібно знати про навчання, формат
						курсів, практику та старт кар’єри у
						веб-розробці
					</p>
				</div>

				<div
					ref={containerRef}
					className='relative mt-8 flex flex-col gap-10 md:mt-12'
				>
					{faqData.map(section => (
						<div key={section.title}>
							<h3 className='mb-6 text-lg font-medium text-[#150A35] dark:text-white'>
								{section.title}
							</h3>
							<div className='flex flex-col gap-3'>
								{section.items.map(
									(item, index) => {
										const id = `${section.title}-${index}`
										const isActive =
											activeId ===
											id
										return (
											<div
												key={id}
												className={cn(
													'relative rounded-lg transition-all duration-200',
													isActive
														? 'bg-white shadow-sm dark:bg-zinc-950'
														: 'hover:bg-white/80 dark:hover:bg-zinc-950'
												)}
											>
												{isActive && (
													<div className='absolute inset-0'>
														<GridLineHorizontal
															className='-top-[2px]'
															offset='100px'
														/>
														<GridLineHorizontal
															className='-bottom-[2px]'
															offset='120px'
														/>
														<GridLineVertical
															className='-left-[2px]'
															offset='120px'
														/>
														<GridLineVertical
															className='-right-[2px] left-auto'
															offset='100px'
														/>
													</div>
												)}
												<button
													onClick={() =>
														toggleQuestion(
															id
														)
													}
													className='hover:bg-accent flex w-full items-center justify-between rounded-lg px-4 py-4 text-left transition-all duration-150 dark:hover:bg-zinc-900'
												>
													<span className='text-sm font-medium text-[#150A35] md:text-base dark:text-white'>
														{
															item.question
														}
													</span>
													<motion.div
														animate={{
															rotate: isActive
																? 45
																: 0
														}}
														transition={{
															duration: 0.2
														}}
														className='ml-4 shrink-0'
													>
														<IconPlus
															className={cn(
																'size-5 shrink-0 text-gray-500'
															)}
														/>
													</motion.div>
												</button>
												<AnimatePresence
													initial={
														false
													}
												>
													{isActive && (
														<motion.div
															initial={{
																height: 0,
																opacity: 0
															}}
															animate={{
																height: 'auto',
																opacity: 1
															}}
															exit={{
																height: 0,
																opacity: 0
															}}
															transition={{
																duration: 0.15,
																ease: 'easeInOut'
															}}
															className='relative'
														>
															<p className='max-w-[90%] px-4 pb-4 text-sm text-gray-600'>
																{
																	item.answer
																}
															</p>
														</motion.div>
													)}
												</AnimatePresence>
											</div>
										)
									}
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
