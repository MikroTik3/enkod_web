import type { Metadata } from 'next'
import { Fragment } from 'react'

import { Courses } from '@/components/home/courses'
import { FAQs } from '@/components/home/faq'
import { Features } from '@/components/home/features'
import { Hero } from '@/components/home/hero'
import { TelegramCTA } from '@/components/home/telegram-cta'

export const metadata: Metadata = {
	title: 'Освітня платформа з веброзробки в Україні',
	description:
		'Enkod — сучасна освітня платформа з веброзробки в Україні. Навчайтеся створювати реальні проєкти та працювати з сучасними технологіями.',
	openGraph: {
		title: 'Освітня платформа з веброзробки в Україні — Enkod',
		description:
			'Enkod — сучасна освітня платформа з веброзробки в Україні. Навчайтеся створювати реальні проєкти та працювати з сучасними технологіями.',
		images: [
			{
				url: `${process.env.NEXT_PUBLIC_APP_URL}/og?title=${encodeURIComponent('Освітня платформа з веброзробки в Україні')}&subtitle=${encodeURIComponent('Enkod — сучасна освітня платформа з веброзробки в Україні. Навчайтеся створювати реальні проєкти та працювати з сучасними технологіями.')}`,
				width: 1200,
				height: 630
			}
		]
	}
}

export default async function HomePage() {
	return (
		<Fragment>
			<Hero />
			<Features />
			<Courses />
			<FAQs />
			<TelegramCTA />
		</Fragment>
	)
}