import type { Metadata } from 'next'

import { CourseCard } from '@/components/course/course-card'

export const metadata: Metadata = {
	title: 'Курсі'
}

export default async function CoursesPage() {
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

				<div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3'>
					{[1, 2, 3, 4, 5, 6].map((_, index) => (
						<CourseCard
							key={index}
							course={{
								id: 'sdfsefsdgse',
								title: 'Shaders',
								slug: 'shaders',
								shortDescription:
									'A collection of reusable shaders for your backgrounds.',
								fullDescription:
									'A collection of reusable shaders for your backgrounds. A collection of reusable shaders for your backgrounds.',
								thumbnail:
									'https://assets.aceternity.com/components/hero-section-with-mousemove.webp',
								youtubeUrl: '',
								views: 3453,
								createdAt: ''
							}}
						/>
					))}
				</div>
			</div>
		</section>
	)
}
