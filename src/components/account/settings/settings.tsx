'use client'

import { AccountForm } from './account-form'
import { Subscription } from './subscription'
import { useCurrent } from '@/hooks'

export function Settings() {
	const { user } = useCurrent()

	return (
		<div className='mx-auto w-full max-w-xl pb-10'>
			<h2 className='text-lg text-center font-medium'>Зовнішній вигляд</h2>
			
			<div className='flex mt-4 flex-col gap-8'>
				<AccountForm user={user} />
				<Subscription user={user} />
			</div>
		</div>
	)
}