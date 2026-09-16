import type { Metadata } from 'next'

import { ResetPasswordForm } from '@/components/auth/reset-password-form'

export const metadata: Metadata = {
	title: 'Скидання пароля',
	description: 'Відновіть доступ до свого облікового запису Enkod та встановіть новий пароль.',
	openGraph: {
		title: 'Скидання пароля — Enkod',
		description:
			'Відновіть доступ до свого облікового запису Enkod та встановіть новий пароль.',
		images: [
			{
				url: `${process.env.NEXT_PUBLIC_APP_URL}/og?title=${encodeURIComponent('Скидання пароля')}&subtitle=${encodeURIComponent('Відновіть доступ до свого облікового запису Enkod та встановіть новий пароль.')}`,
				width: 1200,
				height: 630
			}
		]
	}
}

export default function ResetPasswordPage() {
	return <ResetPasswordForm />
}