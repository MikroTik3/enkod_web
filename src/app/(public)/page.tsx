import type { Metadata } from 'next'
import { Fragment } from 'react'

import { Courses } from '@/components/home/courses'
import { FAQs } from '@/components/home/faq'
import { Features } from '@/components/home/features'
import { Hero } from '@/components/home/hero'
import { TelegramCTA } from '@/components/home/telegram-cta'

export const metadata: Metadata = {
	title: 'Освітня платформа з веброзробки в Україні'
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
