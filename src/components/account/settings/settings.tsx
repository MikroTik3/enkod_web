'use client'

import { Fragment } from 'react'

import { Heading } from '@/components/shared/heading'

import { AccountActions } from './account-actions'
import { AccountForm } from './account-form'
import { ProfileForm } from './profile-form'
import { TwoStepAuthForm } from './two-step-auth-form'
import { useFetchMfaStatus } from '@/api/hooks'
import { useCurrent } from '@/hooks'

export function Settings() {
	const { user } = useCurrent()

	const { data: status } = useFetchMfaStatus()

	return (
		<div className='w-full'>
			<div className='mx-auto flex h-full max-w-5xl flex-col gap-4'>
				<Fragment>
					<Heading
						title='Налаштування облікового запису'
						description='Управління налаштуваннями вашого облікового запису'
					/>
					<div className='mt-2 space-y-9'>
						<ProfileForm user={user} />
						<AccountForm user={user} />
						<TwoStepAuthForm status={status} />
						<AccountActions />
					</div>
				</Fragment>
			</div>
		</div>
	)
}
