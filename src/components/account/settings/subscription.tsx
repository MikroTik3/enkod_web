import { Card, CardContent } from '../../ui/card'

import { AutoBillingForm } from './auto-billing-form'
import type { AccountResponse } from '@/api/generated'

interface SubscriptionProps {
	user: AccountResponse | undefined
}

export function Subscription({ user }: SubscriptionProps) {
	return (
		<div className='flex flex-col gap-y-3'>
			<h2  className='px-1 text-xs font-medium tracking-wider text-muted-foreground uppercase'>Підписка</h2>
			<AutoBillingForm user={user} />
		</div>
	)
}
