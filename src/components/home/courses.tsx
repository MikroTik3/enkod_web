'use client'

import { useQuery } from '@tanstack/react-query'

import { CourseCard, CourseCardSkeleton } from '../course/course-card'

import { getCourses } from '@/api/requests'

export function Courses() {
	const {
		data: courses = [],
		isLoading,
		isError
	} = useQuery({
		queryKey: ['courses'],
		queryFn: getCourses
	})

	return (
		<section
			id='courses'
			className='mx-auto max-w-335 px-4 pt-24 pb-16 md:pt-36 md:pb-24'
		>
			<div className='flex flex-col items-center gap-20'>
				<div className='flex flex-col items-center gap-2'>
					<h2 className='text-2xl tracking-tight text-balance text-neutral-700 md:text-4xl lg:text-5xl dark:text-neutral-300'>
						Отримайте доступ до всіх курсів
					</h2>
					<p className='text-center text-sm text-neutral-600 md:text-base lg:text-lg dark:text-neutral-400'>
						Одна підписка відкриває повний доступ до
						всіх матеріалів платформи - від основ <br />{' '}
						веброзробки до сучасних технологій Frontend.
					</p>
				</div>

				{isError ? (
					<p className='text-neutral-600 dark:text-neutral-400'>
						Не вдалося завантажити курси
					</p>
				) : (
					<div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3'>
						{isLoading
							? Array.from({ length: 3 }).map(
									(_, i) => (
										<CourseCardSkeleton
											key={i}
										/>
									)
								)
							: courses.map(course => (
									<CourseCard
										key={course.id}
										course={course}
									/>
								))}
					</div>
				)}
			</div>
		</section>
	)
}
