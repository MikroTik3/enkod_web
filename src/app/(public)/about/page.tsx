import { APP_CONFIG } from '@/constants/app'
import {
	IconArrowUpRight,
	IconChevronRight,
	IconFileText,
	IconMail
} from '@tabler/icons-react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { FaGithub, FaYoutube, FaLinkedinIn } from 'react-icons/fa'
import { RiTelegram2Fill } from 'react-icons/ri'

import { ROUTES } from '@/constants/routes'

export const metadata: Metadata = {
	title: 'Про мене — Enkod',
	description:
		'Сучасна платформа для навчання веб-розробці та створення реальних проєктів',
	openGraph: {
		title: 'Про мене — Enkod',
		description:
			'Сучасна платформа для навчання веб-розробці та створення реальних проєктів',
		siteName: 'Enkod',
		images: [
			{
				url: `${APP_CONFIG.baseUrl}/og?title=${encodeURIComponent('Про мене')}&subtitle=${encodeURIComponent('Сучасна платформа для навчання веб-розробці та створення реальних проєктів')}`,
				width: 1200,
				height: 630
			}
		]
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Про мене — Enkod',
		description:
			'Сучасна платформа для навчання веб-розробці та створення реальних проєктів',
		images: [
			`${APP_CONFIG.baseUrl}/og?title=${encodeURIComponent('Про мене')}&subtitle=${encodeURIComponent('Сучасна платформа для навчання веб-розробці та створення реальних проєктів')}`
		]
	}
}

const FACTS = [
	{ label: 'Платформа', value: 'Enkod' },
	{ label: 'Запуск', value: '2026' },
	{ label: 'Формат', value: 'Онлайн навчання' },
	{ label: 'Курси', value: 'Frontend, Backend, Fullstack' },
	{ label: 'Проєкти', value: '2+ практичних кейсів' },
	{
		label: 'Технології',
		value: 'React, Next.js, TypeScript, Tailwind CSS, Nest.js'
	},
	{ label: 'Підтримка', value: 'dotsenk20034@gmail.com' }
]

const LINKS = [
	{
		href: 'https://www.linkedin.com/in/artur-docenko',
		label: 'LinkedIn',
		icon: FaLinkedinIn,
		color: '#0A66C2'
	},
	{ 
		href: 'https://github.com/MikroTik3', 
		label: 'GitHub', 
		icon: FaGithub, 
		color: '#24292F' 
	}, 
	{ 
		href: 'https://youtube.com', 
		label: 'YouTube', 
		icon: FaYoutube, 
		color: '#FF0000' 
	}, 
	{ 
		href: 'https://t.me/enkod_community', 
		label: 'Telegram', 
		icon: RiTelegram2Fill, 
		color: '#0088CC' 
	}, 
	{ 
		href: 'mailto:dotsenk20034@gmail.com', 
		label: 'Підтримка', 
		icon: IconMail, 
		color: '#000000' 
	}, 
	{ 
		href: 'https://api.enkod.top/docs', 
		label: 'Документація', 
		icon: IconFileText, 
		color: '#000000', 
		internal: true 
	}
]

const FEATURES = [
	'Практичний код з першого заняття',
	'Адаптивна верстка під будь-які пристрої',
	'Підтримка сучасних технологій (React, Next.js)',
	'TypeScript для реальних проєктів',
	'Доступність та кращі практики UI/UX',
	'SEO-оптимізована структура проєктів',
	'Оптимізація продуктивності застосунків',
	'Регулярне оновлення матеріалів курсу'
]

const POLICY = [
	{
		href: ROUTES.DOCUMENTS.PRIVACY,
		label: 'Політика конфіденційності'
	},
	{
		href: ROUTES.DOCUMENTS.TERMS,
		label: 'Умови використання'
	}
]

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
	return (
		<div className={`rounded-xl bg-white shadow-sm ring-1 shadow-black/5 ring-black/[0.08] dark:bg-neutral-900 dark:shadow-black/20 dark:ring-white/[0.06] ${className || ''}`}>
			{children}
		</div>
	)
}

export default async function AboutPage() {
	return (
		<div className='relative min-h-screen bg-neutral-50 dark:bg-neutral-950'>
			<div className='mx-auto max-w-3xl px-4 pt-24 pb-16 md:pt-36 md:pb-24'>
				<header className='mb-12'>
					<p className='mb-3 text-sm font-medium text-neutral-500 dark:text-neutral-400'>
						Про мене
					</p>
					<h1 className='mb-3 text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl dark:text-white'>
						Enkod
					</h1>
					<p className='text-lg text-neutral-600 dark:text-neutral-400'>
						Сучасна платформа для навчання веб-розробці
						та створення реальних проєктів
					</p>
				</header>

				<section className='mb-10 rounded-xl bg-white p-6 shadow-sm ring-1 shadow-black/5 ring-black/[0.08] dark:bg-neutral-900 dark:shadow-black/20 dark:ring-white/[0.06]'>
					<p className='mb-2 text-xs font-medium tracking-wider text-neutral-400 uppercase'>
						{' '}
						Короткий огляд{' '}
					</p>
					<p className='text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-300'>
						<strong className='font-medium text-neutral-900 dark:text-white'>
							{' '}
							Enkod{' '}
						</strong>
						Короче, я Артур, из прифронтового города
						Марганец на Донбассе. Мне 18 лет, я учусь в
						днепровском университете. И если честно,
						меня трохи расстраивает система обучения в
						Украине, потому что я не особо вижу в ней
						перспектив. Ты как будто учишься просто ради
						какой-то «корочки». Реальных, полезных
						знаний, которые потом помогут в работе,
						почти нет. Часто дают довольно устаревший
						материал, который выглядит так, будто его не
						обновляли десятки лет и он уже мало кому
						реально потрібен. Ещё момент - я из
						маленького города, и чтобы просто доехать до
						универа, нужно проехать около 110 км. Но
						даже не тільки в этом проблема. Само
						обучение и окружение какое-то пустое:
						нормального общения, комьюнити, знакомств
						почти нет. Я, например, своих одногруппников
						видел буквально один раз и всё. Из-за этого
						становится трохи сумно, потому что ожидания
						были совсем другими, а по факту получилось
						не совсем то, на что я рассчитывал. Если
						коротко про меня: я обычный веб-разработчик.
						Не какой-то гений или «супер-умный», просто
						человек, который умеет писать код и делает
						это в сфере веба. И когда я смотрю, как
						развивается IT в Украине, мне становится
						трохи тревожно и грустно. Поэтому я хочу
						начать чет делать сам — записывать
						материалы, обучать других, рассказывать про
						украинские сервисы, о которых мало кто
						знает, и в целом поднимать тему IT в
						Украине. И я надеюсь, что у меня это
						получится, и всё дальше сложится нормально.
					</p>
				</section>

				<section className='mb-10'>
					<h2 className='mb-4 text-sm font-medium text-neutral-900 dark:text-white'>
						Основні факти
					</h2>

					<Card>
						<dl className='divide-y divide-neutral-100 dark:divide-neutral-800'>
							{FACTS.map(item => (
								<div
									key={item.label}
									className='flex items-center justify-between gap-4 px-4 py-3'
								>
									<dt className='text-sm text-neutral-500 dark:text-neutral-400'>
										{item.label}
									</dt>
									<dd className='text-end text-sm font-medium text-neutral-900 dark:text-white'>
										{item.value}
									</dd>
								</div>
							))}
						</dl>
					</Card>
				</section>

				<section className='mb-10'>
					<h2 className='mb-4 text-sm font-medium text-neutral-900 dark:text-white'>
						Посилання
					</h2>

					<div className='grid gap-2 sm:grid-cols-2'>
						{LINKS.map(
							({
								href,
								label,
								icon: Icon,
								color,
								internal
							}) =>
								internal ? (
									<Link
										key={label}
										href={href}
										className='flex items-center gap-3 rounded-xl bg-white p-2.5 shadow-sm ring-1 ring-black/[0.08] hover:shadow-md dark:bg-neutral-900 dark:ring-white/[0.06]'
									>
										<div className='relative flex aspect-square size-7 items-center justify-center rounded-sm align-middle ring-1 ring-offset-2 ring-inset bg-linear-to-b from-neutral-200 to-neutral-200 ring-offset-neutral-200 shadow-none ring-white'>
											<Icon className='size-4' style={{ color: color }} />
										</div>
										<span className='flex-1 text-sm text-neutral-700 dark:text-neutral-300'>
											{label}
										</span>
										<IconArrowUpRight className='size-3.5 text-neutral-300 dark:text-neutral-600' />
									</Link>
								) : (
									<a
										key={label}
										href={href}
										target='_blank'
										rel='noopener noreferrer'
										className='flex items-center gap-3 rounded-xl bg-white p-2.5 shadow-sm ring-1 ring-black/[0.08] hover:shadow-md dark:bg-neutral-900 dark:ring-white/[0.06]'
									>
										<div className='relative flex aspect-square size-7 items-center justify-center rounded-sm align-middle ring-1 ring-offset-2 ring-inset bg-linear-to-b from-neutral-200 to-neutral-200 ring-offset-neutral-200 shadow-none ring-white'>
											<Icon className='size-4' style={{ color: color }} />
										</div>
										<span className='flex-1 text-sm text-neutral-700 dark:text-neutral-300'>
											{label}
										</span>
										<IconArrowUpRight className='size-3.5 text-neutral-300 dark:text-neutral-600' />
									</a>
								)
						)}
					</div>
				</section>

				<section className='mb-10'>
					<h2 className='mb-4 text-sm font-medium text-neutral-900 dark:text-white'>
						Переваги навчання
					</h2>

					<Card>
						<ul className='grid gap-2 p-4 sm:grid-cols-2'>
							{FEATURES.map(item => (
								<li
									key={item}
									className='flex items-center gap-2.5 text-[14px] text-neutral-600 dark:text-neutral-400'
								>
									✓ {item}
								</li>
							))}
						</ul>
					</Card>
				</section>

				<section className='mb-10'>
					<h2 className='mb-4 text-sm font-medium text-neutral-900 dark:text-white'>
						Політика
					</h2>

					<Card className='overflow-hidden'>
						<div className='divide-y divide-neutral-100 dark:divide-neutral-800'>
							{POLICY.map(item => (
								<Link
									key={item.href}
									href={item.href}
									className='flex items-center justify-between px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
								>
									<span className='text-sm text-neutral-600 dark:text-neutral-400'>
										{item.label}
									</span>
									<IconChevronRight className='size-4 text-neutral-300 dark:text-neutral-600' />
								</Link>
							))}
						</div>
					</Card>
				</section>
			</div>
		</div>
	)
}
