'use client'

import type { ReactNode } from 'react'

import { EllipsisLoader } from '../components/shared/ellipsis-loader'

import { useFetchMfaStatus } from '@/api/hooks'
import { useCurrent } from '@/hooks'

export function AccountProvider({ children }: { children: ReactNode }) {
	const { isLoading } = useCurrent()

	const { isLoading: isLoadingStatus } = useFetchMfaStatus({
		retry: false
	})

	if (isLoading || isLoadingStatus) {
		return (
			<div className='flex min-h-screen items-center justify-center'>
				<EllipsisLoader />
			</div>
		)
	}

	return <>{children}</>
}
