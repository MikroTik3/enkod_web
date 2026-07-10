import { CourseCard } from '../course/course-card'

export function Courses() {
	return (
		<section
			id='courses'
			className='mx-auto max-w-335 px-4 py-10 md:px-8 md:py-20 lg:py-32'
		>
			<div className='flex flex-col gap-5'>
				<div className='flex flex-col items-center gap-2 text-center'>
					<h2 className='text-2xl tracking-tight text-balance text-neutral-700 md:text-4xl lg:text-5xl dark:text-neutral-300'>
						Сучасні курси з веброзробки
					</h2>
					<p className='text-sm text-neutral-600 md:text-base lg:text-lg dark:text-neutral-400'>
						Від перших кроків до реальних проєктів -
						практичне навчання, яке готує до роботи в
						індустрії
					</p>
				</div>

				<div className='mx-auto mt-8 grid gap-4 sm:grid-cols-3 md:mt-12 md:grid-cols-4'>
					{[1, 2, 3, 4].map((_, index) => (
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
