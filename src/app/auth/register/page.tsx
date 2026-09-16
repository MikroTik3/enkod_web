import type { Metadata } from 'next'

import { RegisterForm } from '@/components/auth/register-form'

export const metadata: Metadata = {
	title: 'Створіть обліковий запис',
	description: 'Створіть обліковий запис Enkod та отримайте доступ до навчальних матеріалів.',
	openGraph: {
		title: 'Створіть обліковий запис — Enkod',
		description:
			'Створіть обліковий запис Enkod та отримайте доступ до навчальних матеріалів.',
		images: [
			{
				url: `${process.env.NEXT_PUBLIC_APP_URL}/og?title=${encodeURIComponent('Створіть обліковий запис')}&subtitle=${encodeURIComponent('Створіть обліковий запис Enkod та отримайте доступ до навчальних матеріалів.')}`,
				width: 1200,
				height: 630
			}
		]
	}
}

export default function RegisterPage() {
	return <RegisterForm />
}