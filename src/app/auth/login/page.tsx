import { APP_CONFIG } from '@/constants/app'
import type { Metadata } from 'next'

import { LoginForm } from '@/components/auth/login-form'

export const metadata: Metadata = {
	title: 'Увійти в обліковий запис',
	description: 'Увійдіть до свого облікового запису Enkod.',
	openGraph: {
		title: 'Увійти в обліковий запис — Enkod',
		description: 'Увійдіть до свого облікового запису Enkod.',
		siteName: 'Enkod',
		images: [
			{
				url: `${APP_CONFIG.baseUrl}/og?title=${encodeURIComponent('Увійти в обліковий запис')}&subtitle=${encodeURIComponent('Увійдіть до свого облікового запису Enkod.')}`,
				width: 1200,
				height: 630
			}
		]
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Увійти в обліковий запис — Enkod',
		description: 'Увійдіть до свого облікового запису Enkod.',
		images: [
			`${APP_CONFIG.baseUrl}/og?title=${encodeURIComponent('Увійти в обліковий запис')}&subtitle=${encodeURIComponent('Увійдіть до свого облікового запису Enkod.')}`
		]
	}
}

export default function LoginPage() {
	return <LoginForm />
}