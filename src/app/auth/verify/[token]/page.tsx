import type { Metadata } from 'next'

import { VerifyEmail } from '@/components/auth/verify-email'

export const metadata: Metadata = {
	title: 'Верифікація пошти',
	description: 'Підтвердіть свою електронну адресу, щоб завершити реєстрацію в Enkod.',
	openGraph: {
		title: 'Верифікація пошти — Enkod',
		description:
			'Підтвердіть свою електронну адресу, щоб завершити реєстрацію в Enkod.',
		images: [
			{
				url: `${process.env.NEXT_PUBLIC_APP_URL}/og?title=${encodeURIComponent('Верифікація пошти')}&subtitle=${encodeURIComponent('Підтвердіть свою електронну адресу, щоб завершити реєстрацію в Enkod.')}`,
				width: 1200,
				height: 630
			}
		]
	}
}

export default async function VerifyEmailPage() {
	return <VerifyEmail />
}