import type { Metadata } from 'next'

import { NewPasswordForm } from '@/components/auth/new-password-form'

export const metadata: Metadata = {
	title: 'Новий пароль',
	description: 'Встановіть новий пароль для свого облікового запису Enkod.',
	openGraph: {
		title: 'Новий пароль — Enkod',
		description: 'Встановіть новий пароль для свого облікового запису Enkod.',
		images: [
			{
				url: `${process.env.NEXT_PUBLIC_APP_URL}/og?title=${encodeURIComponent('Новий пароль')}&subtitle=${encodeURIComponent('Встановіть новий пароль для свого облікового запису Enkod.')}`,
				width: 1200,
				height: 630
			}
		]
	}
}

export default async function NewPasswordPage() {
	return <NewPasswordForm />
}