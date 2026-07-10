import type { Metadata } from 'next'
import { Fragment } from 'react/jsx-runtime'

import Faq from '@/components/subscription/faq'
import Subscription from '@/components/subscription/subscription'

export const metadata: Metadata = {
	title: 'Підписка'
}

export default async function SubscriptionPage() {
	return (
		<Fragment>
			<Subscription />
			<Faq />
		</Fragment>
	)
}
