import { Card, CardContent } from '../../ui/card'

import { EmailForm } from './email-form'
import { PasswordForm } from './password-form'
import type { AccountResponse } from '@/api/generated'

interface AccountFormProps {
	user: AccountResponse | undefined
}

export function AccountForm({ user }: AccountFormProps) {
	return (
		<section className='flex flex-col gap-3'>
			<h2  className='px-1 text-xs font-medium tracking-wider text-muted-foreground uppercase'>Акаунт</h2>

			<Card className='py-0 rounded-4xl shadow-none'>
				<CardContent className='p-0'>
					<div className='divide-y divide-border'>
						<EmailForm user={user} />
						<PasswordForm />
					</div>
				</CardContent>
			</Card>

			<p className='px-1 text-sm leading-5 text-muted-foreground'>
				Керуйте електронною поштою та паролем для входу в обліковий запис.
			</p>
		</section>
	)
}