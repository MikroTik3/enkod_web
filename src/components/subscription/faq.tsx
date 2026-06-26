'use client'

import { IconPlus } from '@tabler/icons-react'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import {
	GridLineHorizontal,
	GridLineVertical
} from '@/components/ui/grid-lines'

import { cn } from '@/lib/utils'

interface FAQItem {
	question: string
	answer: any
}

interface FAQSection {
	title: string
	items: FAQItem[]
}

const faqData: FAQSection[] = [
	{
		title: 'Про підписку',
		items: [
			{
				question: 'Як можна оплатити підписку?',
				answer: 'Оплату можна здійснити за допомогою Monobank'
			},
			{
				question: 'Як і коли можна скасувати підписку?',
				answer: (
					<>
						Скасувати підписку можна в будь-який час у{' '}
						<a
							href='http://localhost:14701/account/settings'
							className='text-black underline'
						>
							налаштуваннях акаунта
						</a>
						.
						<br />
						<br />
						Після скасування доступ до преміум-функцій
						зберігатиметься до завершення вже оплаченого
						періоду. Коли настане час продовження
						підписки, ми надішлемо вам лист на
						електронну пошту з рахунком для оплати. Якщо
						рахунок не буде оплачено вчасно, підписка
						автоматично припиниться.
					</>
				)
			},
			{
				question: 'Що входить до підписки?',
				answer: 'Підписка надає повний та необмежений доступ до всього вихідного коду всіх проєктів, включно з усіма оновленнями та новими релізами. Окрім цього, підписка додає вам значок Живчик у таблиці лідерів, щоб інші користувачі одразу бачили ваш статус.'
			}
		]
	}
]

export default function Faq() {
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
			className='mx-auto max-w-335 px-4 pt-24 pb-16 md:pt-36 md:pb-24'
		>
			<div>
				<div className='flex flex-col items-center gap-2 text-center'>
					<h2 className='text-center text-4xl font-medium tracking-tight text-neutral-600 md:text-5xl dark:text-neutral-50'>
						Поширені запитання
					</h2>
					<p className='mx-auto max-w-lg text-center text-base text-neutral-600 dark:text-neutral-50'>
						Якщо ви не знайдете тут те, що вам потрібно,
						зв’яжіться з нами за адресою
						<Link
							className='ml-1 text-black underline'
							href='mailto:dotsenk20034@gmail.com'
						>
							dotsenk20034@gmail.com
						</Link>
					</p>
				</div>

				<div
					ref={containerRef}
					className='relative mt-8 flex flex-col gap-10 md:mt-12'
				>
					{faqData.map(section => (
						<div key={section.title}>
							<h3 className='mb-6 text-lg font-medium text-[#150A35]'>
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
														? 'bg-white shadow-sm'
														: 'hover:bg-white/80'
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
													className='hover:bg-accent flex w-full items-center justify-between rounded-lg px-4 py-4 text-left transition-all duration-150'
												>
													<span className='text-sm font-medium text-[#150A35] md:text-base'>
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
