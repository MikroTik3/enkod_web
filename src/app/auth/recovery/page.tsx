import { APP_CONFIG } from '@/constants/app'
import type { Metadata } from 'next'

import { ResetPasswordForm } from '@/components/auth/reset-password-form'

export const metadata: Metadata = {
	title: 'Скидання пароля',
	description:
		'Відновіть доступ до свого облікового запису Enkod та встановіть новий пароль.',
	openGraph: {
		title: 'Скидання пароля — Enkod',
		description:
			'Відновіть доступ до свого облікового запису Enkod та встановіть новий пароль.',
		siteName: 'Enkod',
		images: [
			{
				url: `${APP_CONFIG.baseUrl}/og?title=${encodeURIComponent('Скидання пароля')}&subtitle=${encodeURIComponent('Відновіть доступ до свого облікового запису Enkod та встановіть новий пароль.')}`,
				width: 1200,
				height: 630
			}
		]
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Скидання пароля — Enkod',
		description:
			'Відновіть доступ до свого облікового запису Enkod та встановіть новий пароль.',
		images: [
			`${APP_CONFIG.baseUrl}/og?title=${encodeURIComponent('Скидання пароля')}&subtitle=${encodeURIComponent('Відновіть доступ до свого облікового запису Enkod та встановіть новий пароль.')}`
		]
	}
}

export default function ResetPasswordPage() {
	return <ResetPasswordForm />
}