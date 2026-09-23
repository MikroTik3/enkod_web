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

				<div className='mx-auto mt-8'>
						<CourseCard
							comingSoon
							course={{
								id: 'ecommerce',
								title: 'Ecommerce',
								slug: 'nestjs-ecommerce',
shortDescription:
	'Практичний курс з NestJS, де з нуля створюємо повноцінний eCommerce-магазин з авторизацією, базою даних, Redis, платежами та Docker.',

fullDescription:
	'Великий практичний курс з NestJS. Разом створюємо повноцінний eCommerce-магазин з нуля: проєктуємо архітектуру, реалізовуємо API, авторизацію, роботу з PostgreSQL та Redis, платежі й інтеграцію із зовнішніми сервісами, а потім розгортаємо проєкт за допомогою Docker.',
								thumbnail:
									'http://res.cloudinary.com/terieyenike/image/upload/v1790176127/uploaded/2026-09-23%2018.08.37.jpg.jpg',
								youtubeUrl: '',
								views: 0,
								createdAt: ''
							}}
						/>
				</div>
			</div>
		</section>
	)
}
