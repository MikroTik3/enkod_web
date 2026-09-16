import type { Metadata } from 'next'

import { LoginForm } from '@/components/auth/login-form'

export const metadata: Metadata = {
	title: 'Увійти в обліковий запис',
	description: 'Увійдіть до свого облікового запису Enkod.',
	openGraph: {
		title: 'Увійти в обліковий запис — Enkod',
		description: 'Увійдіть до свого облікового запису Enkod.',
		images: [
			{
				url: `${process.env.NEXT_PUBLIC_APP_URL}/og?title=${encodeURIComponent('Увійти в обліковий запис')}&subtitle=${encodeURIComponent('Увійдіть до свого облікового запису Enkod.')}`,
				width: 1200,
				height: 630
			}
		]
	}
}

export default function LoginPage() {
	return <LoginForm />
}