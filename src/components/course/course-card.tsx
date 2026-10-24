import Link from 'next/link'

import type { CourseResponse } from '@/api/generated'
import { ROUTES } from '@/constants'

interface CourseCardProps {
	course: CourseResponse
	comingSoon?: boolean
}

export function CourseCardSkeleton() {
	return (
		<div className='flex animate-pulse flex-col gap-4 rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800'>
			<div className='aspect-video w-full rounded-xl bg-neutral-200 dark:bg-neutral-800' />

			<div className='flex flex-col gap-2'>
				<div className='h-6 w-3/4 rounded-md bg-neutral-200 dark:bg-neutral-800' />
				<div className='h-4 w-full rounded-md bg-neutral-200 dark:bg-neutral-800' />
				<div className='h-4 w-5/6 rounded-md bg-neutral-200 dark:bg-neutral-800' />
			</div>
		</div>
	)
}

export function CourseCard({ course, comingSoon = false }: CourseCardProps) {
	return (
		<Link
			href={ROUTES.COURSES.SINGLE(course.slug)}
			className='group block h-full max-w-115 overflow-hidden rounded-3xl bg-gray-100 antialiased transition duration-200 hover:bg-gray-50 dark:bg-neutral-900 dark:hover:bg-neutral-900'
		>
			<div className='relative overflow-hidden rounded-2xl bg-neutral-200/50 transition duration-200 dark:bg-neutral-950'>
				<div className='p-1'>
					<div className='relative overflow-hidden rounded-2xl'>
						<img
							draggable='false'
							alt={course.title}
							loading='lazy'
							width='1024'
							height='1020'
							decoding='async'
							className='aspect-auto max-h-64 min-h-64 w-full rounded-2xl shadow-sm ring-1 shadow-black/10 ring-black/10 transition-all duration-200 will-change-transform group-hover:scale-105 dark:shadow-black/50 dark:ring-black/50'
							src={course.thumbnail ?? ''}
						/>
					</div>
				</div>
			</div>

			<div className='px-4 pt-2 pb-8'>
				<div className='mt-4 mb-2 flex items-center justify-start gap-4'>
					<p className='text-xl font-bold text-neutral-700 dark:text-neutral-100'>
						{course.title}
					</p>

					{course.youtubeUrl && (
						<span className='rounded-sm bg-white px-1 py-0.5 text-[10px] font-medium text-neutral-700 shadow-sm ring-1 shadow-black/10 ring-black/5 dark:bg-neutral-900 dark:text-neutral-300 dark:shadow-black/50 dark:ring-black/50'>
							Youtube
						</span>
					)}

					{comingSoon && (
						<span className='rounded-sm bg-white px-1 py-0.5 text-[10px] font-medium text-neutral-700 shadow-sm ring-1 shadow-black/10 ring-black/5 dark:bg-neutral-900 dark:text-neutral-300 dark:shadow-black/50 dark:ring-black/50'>
							Скоро
						</span>
					)}
				</div>

				<p className='mt-2 line-clamp-2 text-sm font-normal text-neutral-500 dark:text-neutral-500'>
					{course.shortDescription}
				</p>
			</div>
		</Link>
	)
}
