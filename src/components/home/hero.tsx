'use client'

import { IconArrowRight } from '@tabler/icons-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

import { buttonVariants } from '../ui/button'
import { LinesGradientShader } from '../ui/lines-gradient-shader'

import { ROUTES } from '@/constants'

function useIsMobile(breakpoint = 768) {
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
		const update = () => setIsMobile(mq.matches)

		update()
		mq.addEventListener('change', update)
		return () => mq.removeEventListener('change', update)
	}, [breakpoint])

	return isMobile
}

export function Hero() {
	const isMobile = useIsMobile()

	return (
		<section
			id='hero'
			className='relative flex min-h-screen w-full overflow-hidden bg-white dark:bg-zinc-950'
		>
			<LinesGradientShader
				className='pointer-events-none absolute inset-0 z-10 overflow-hidden bg-transparent mask-b-from-50% dark:bg-transparent'
				bandCount={isMobile ? 4 : 6}
				bandSpacing={isMobile ? 0.6 : 1}
				xOffset={isMobile ? -250 : -28}
				yOffset={isMobile ? -10 : -30}
				rotationAngle={isMobile ? 35 : 20}
			/>

			<div className='z-20 mx-auto flex w-full max-w-335 flex-col justify-center gap-6 px-4 text-sm md:px-8'>
				<a
					className='ring-none group flex w-fit items-center gap-2 rounded-full bg-white px-2 py-1 text-xs text-neutral-700 transition duration-200 hover:bg-neutral-50 active:scale-98 dark:bg-neutral-800 dark:text-neutral-300'
					target='_blank'
					href='https://t.me/enkod_community'
				>
					Приєднуйся до нашого Telegram-каналу
					<span className='duration-150 group-hover:translate-x-0.5'>
						<IconArrowRight className='size-4' />
					</span>
				</a>

				<div className='flex flex-col gap-4'>
					<h1 className='max-w-4xl text-3xl font-medium tracking-tight text-neutral-700 md:text-7xl dark:text-neutral-300'>
						Навчайся створювати сайти та вебзастосунки.
					</h1>

					<p className='max-w-2xl text-base text-neutral-700 md:text-xl dark:text-neutral-300'>
						Вивчай сучасні технології веброзробки,
						працюй над реальними проєктами та отримуй
						практичні навички для впевненого старту в
						ІТ.
					</p>
				</div>

				<div>
					<Link
						href={ROUTES.COURSES.ROOT}
						className={cn(
							buttonVariants({ size: 'lg' }),
							'rounded-full'
						)}
					>
						Почати навчання
						<IconArrowRight className='size-4' />
					</Link>
				</div>
			</div>
		</section>
	)
}
