'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { EllipsisLoader } from '@/components/shared/ellipsis-loader'

import { cookies } from '@/lib/cookie'

import { instance } from '@/api/instance'
import { ROUTES } from '@/constants'

export default function AuthCallbackPage() {
	const router = useRouter()

	useEffect(() => {
		const hash = window.location.hash
		const token = new URLSearchParams(hash.slice(1)).get('token')

		if (token) {
			cookies.set('token', token, { expires: 30 })

			instance.defaults.headers['X-Session-Token'] = token

			router.push(ROUTES.ACCOUNT.ROOT)
		}
	}, [router])

	return (
		<div className='flex min-h-screen items-center justify-center'>
			<EllipsisLoader />
		</div>
	)
}
