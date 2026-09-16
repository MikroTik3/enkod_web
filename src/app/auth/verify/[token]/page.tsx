import { APP_CONFIG } from '@/constants/app'
import type { Metadata } from 'next'

import { VerifyEmail } from '@/components/auth/verify-email'

export const metadata: Metadata = {
	title: 'Верифікація пошти',
	description:
		'Підтвердіть свою електронну адресу, щоб завершити реєстрацію в Enkod.',
	openGraph: {
		title: 'Верифікація пошти — Enkod',
		description:
			'Підтвердіть свою електронну адресу, щоб завершити реєстрацію в Enkod.',
		siteName: 'Enkod',
		images: [
			{
				url: `${APP_CONFIG.baseUrl}/og?title=${encodeURIComponent('Верифікація пошти')}&subtitle=${encodeURIComponent('Підтвердіть свою електронну адресу, щоб завершити реєстрацію в Enkod.')}`,
				width: 1200,
				height: 630
			}
		]
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Верифікація пошти — Enkod',
		description:
			'Підтвердіть свою електронну адресу, щоб завершити реєстрацію в Enkod.',
		images: [
			`${APP_CONFIG.baseUrl}/og?title=${encodeURIComponent('Верифікація пошти')}&subtitle=${encodeURIComponent('Підтвердіть свою електронну адресу, щоб завершити реєстрацію в Enkod.')}`
		]
	}
}

export default async function VerifyEmailPage() {
	return <VerifyEmail />
}