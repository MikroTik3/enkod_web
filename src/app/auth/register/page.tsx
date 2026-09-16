import { APP_CONFIG } from '@/constants/app'
import type { Metadata } from 'next'

import { RegisterForm } from '@/components/auth/register-form'

export const metadata: Metadata = {
	title: 'Створіть обліковий запис',
	description:
		'Створіть обліковий запис Enkod та отримайте доступ до навчальних матеріалів.',
	openGraph: {
		title: 'Створіть обліковий запис — Enkod',
		description:
			'Створіть обліковий запис Enkod та отримайте доступ до навчальних матеріалів.',
		siteName: 'Enkod',
		images: [
			{
				url: `${APP_CONFIG.baseUrl}/og?title=${encodeURIComponent('Створіть обліковий запис')}&subtitle=${encodeURIComponent('Створіть обліковий запис Enkod та отримайте доступ до навчальних матеріалів.')}`,
				width: 1200,
				height: 630
			}
		]
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Створіть обліковий запис — Enkod',
		description:
			'Створіть обліковий запис Enkod та отримайте доступ до навчальних матеріалів.',
		images: [
			`${APP_CONFIG.baseUrl}/og?title=${encodeURIComponent('Створіть обліковий запис')}&subtitle=${encodeURIComponent('Створіть обліковий запис Enkod та отримайте доступ до навчальних матеріалів.')}`
		]
	}
}

export default function RegisterPage() {
	return <RegisterForm />
}