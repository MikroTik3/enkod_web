'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { EllipsisLoader } from '@/components/shared/ellipsis-loader'

import { cookies } from '@/lib/cookie'

import { TelegramAuthRequest } from '@/api/generated'
import { useTelegramAuth } from '@/api/hooks'
import { instance } from '@/api/instance'
import { ROUTES } from '@/constants'
import { useFingerprint } from '@/hooks'

function base64DecodeUnicode(str: string) {
	try {
		return decodeURIComponent(
			atob(str.replace(/-/g, '+').replace(/_/g, '/'))
				.split('')
				.map(
					c =>
						'%' +
						('00' + c.charCodeAt(0).toString(16)).slice(
							-2
						)
				)
				.join('')
		)
	} catch (err) {
		console.error('Помилка декодування Base64:', err)
		return null
	}
}

export default function TelegramAuthFinishPage() {
	const router = useRouter()

	const { data: fingerprint } = useFingerprint()

	const { mutate } = useTelegramAuth({
		onSuccess(data) {
			cookies.set('token', data.token, { expires: 30 })

			instance.defaults.headers['X-Session-Token'] = data.token

			router.push(ROUTES.ACCOUNT.ROOT)
		}
	})

	useEffect(() => {
		const hashString = window.location.hash.replace(
			'#tgAuthResult=',
			''
		)

		if (hashString) {
			const decoded = base64DecodeUnicode(hashString)

			if (decoded) {
				try {
					const user: TelegramAuthRequest =
						JSON.parse(decoded)

					if (typeof user !== 'object' || user === null)
						throw new Error(
							'Decoded value is not an object'
						)

					mutate({
						...user,
						...(fingerprint && {
							visitorId: fingerprint.visitorId,
							requestId: fingerprint.requestId
						})
					})
				} catch (err) {
					console.error(
						'Помилка парсингу JSON після декодування:',
						err
					)
					router.push(ROUTES.AUTH.LOGIN())
				}
			} else {
				router.push(ROUTES.AUTH.LOGIN())
			}
		}
	}, [fingerprint, mutate, router])

	return (
		<div className='flex min-h-screen items-center justify-center'>
			<EllipsisLoader />
		</div>
	)
}
