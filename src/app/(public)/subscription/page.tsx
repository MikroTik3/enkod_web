import type { Metadata } from 'next'
import { Fragment } from 'react/jsx-runtime'

import Faq from '@/components/subscription/faq'
import Subscription from '@/components/subscription/subscription'

export const metadata: Metadata = {
	title: 'Підписка',
	description:
		'Оформіть підписку Enkod та отримайте повний доступ до всіх навчальних матеріалів і курсів.',
	openGraph: {
		title: 'Підписка — Enkod',
		description:
			'Оформіть підписку Enkod та отримайте повний доступ до всіх навчальних матеріалів і курсів.',
		images: [
			{
				url: `${process.env.NEXT_PUBLIC_APP_URL}/og?title=${encodeURIComponent('Підписка')}&subtitle=${encodeURIComponent('Оформіть підписку Enkod та отримайте повний доступ до всіх навчальних матеріалів і курсів.')}`,
				width: 1200,
				height: 630
			}
		]
	}
}

export default async function SubscriptionPage() {
	return (
		<Fragment>
			<Subscription />
			<Faq />
		</Fragment>
	)
}