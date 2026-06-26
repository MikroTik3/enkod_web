import { ArrowLeft, ArrowRight, ChevronLeft } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { buttonVariants } from '../components/ui/button'
import { ROUTES } from '../constants/routes'
import { cn } from '../lib/utils'

export const metadata: Metadata = {
	title: 'Сторінку не знайдено'
}

export default function NotFoundPage() {
	return (
		<div className='flex h-screen flex-col items-center justify-center gap-5 px-4 text-center'>
			<div
				className={cn(
					'absolute inset-0',
					'[background-size:20px_20px]',
					'[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]',
					'dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]'
				)}
			/>

			<span className='from-foreground z-50 bg-linear-to-b to-white bg-clip-text text-[9rem] leading-none font-extrabold text-transparent sm:text-[16rem]'>
				404
			</span>

			<div className='z-50 flex flex-col gap-3'>
				<h1 className='text-xl font-medium sm:text-2xl'>
					Сторінку не знайдено
				</h1>

				<p className='max-w-md text-sm text-neutral-400 sm:text-base'>
					Сторінка, яку ви шукаєте, не існує або була
					переміщена. <br className='hidden sm:block' />{' '}
					Давайте допоможемо вам повернутися на потрібну
					сторінку.
				</p>
			</div>

			<div className='mt-4 flex flex-wrap items-center justify-center gap-2 gap-x-4 sm:flex-nowrap'>
				<Link
					href={ROUTES.HOME}
					className={cn(
						buttonVariants({ size: 'lg' }),
						'group w-full rounded-full transition-all duration-300 hover:scale-105 sm:w-min'
					)}
				>
					<ArrowLeft className='hidden size-4 transition-transform duration-300 group-hover:-translate-x-1 sm:block' />
					Повертайся на головну
				</Link>
				<Link
					href={ROUTES.COURSES.ROOT}
					className={cn(
						buttonVariants({
							variant: 'outline',
							size: 'lg'
						}),
						'group w-full rounded-full sm:w-min'
					)}
				>
					Повернутись к курсам
					<ArrowRight className='hidden size-4 sm:block' />
				</Link>
			</div>

			<div className='mt-12 flex items-center gap-3 text-neutral-600'>
				<span className='h-px w-8 bg-linear-to-r from-transparent to-neutral-700'></span>
				<span className='text-xs tracking-widest uppercase'>
					Enkod
				</span>
				<span className='h-px w-8 bg-linear-to-l from-transparent to-neutral-700'></span>
			</div>
		</div>
	)
}
