import type { Metadata } from 'next'

import { CourseCard } from '@/components/course/course-card'
import { APP_CONFIG } from '@/constants/app'

export const metadata: Metadata = {
	title: 'Курси',
	description:
		'Отримайте доступ до всіх курсів Enkod — від основ веброзробки до сучасних технологій Frontend.',
	openGraph: {
		title: 'Курси — Enkod',
		description:
			'Отримайте доступ до всіх курсів Enkod — від основ веброзробки до сучасних технологій Frontend.',
		siteName: 'Enkod',
		images: [
			{
				url: `${APP_CONFIG.baseUrl}/og?title=${encodeURIComponent('Курси')}&subtitle=${encodeURIComponent('Отримайте доступ до всіх курсів Enkod — від основ веброзробки до сучасних технологій Frontend.')}`,
				width: 1200,
				height: 630
			}
		]
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Курси — Enkod',
		description:
			'Отримайте доступ до всіх курсів Enkod — від основ веброзробки до сучасних технологій Frontend.',
		images: [
			`${APP_CONFIG.baseUrl}/og?title=${encodeURIComponent('Курси')}&subtitle=${encodeURIComponent('Отримайте доступ до всіх курсів Enkod — від основ веброзробки до сучасних технологій Frontend.')}`
		]
	}
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