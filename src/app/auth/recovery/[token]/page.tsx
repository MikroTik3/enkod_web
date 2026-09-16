import { APP_CONFIG } from '@/constants/app'
import type { Metadata } from 'next'

import { NewPasswordForm } from '@/components/auth/new-password-form'

export const metadata: Metadata = {
	title: 'Новий пароль',
	description: 'Встановіть новий пароль для свого облікового запису Enkod.',
	openGraph: {
		title: 'Новий пароль — Enkod',
		description: 'Встановіть новий пароль для свого облікового запису Enkod.',
		siteName: 'Enkod',
		images: [
			{
				url: `${APP_CONFIG.baseUrl}/og?title=${encodeURIComponent('Новий пароль')}&subtitle=${encodeURIComponent('Встановіть новий пароль для свого облікового запису Enkod.')}`,
				width: 1200,
				height: 630
			}
		]
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Новий пароль — Enkod',
		description: 'Встановіть новий пароль для свого облікового запису Enkod.',
		images: [
			`${APP_CONFIG.baseUrl}/og?title=${encodeURIComponent('Новий пароль')}&subtitle=${encodeURIComponent('Встановіть новий пароль для свого облікового запису Enkod.')}`
		]
	}
}

export default async function NewPasswordPage() {
	return <NewPasswordForm />
}