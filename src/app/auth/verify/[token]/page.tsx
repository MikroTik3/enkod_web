import type { Metadata } from 'next'

import { VerifyEmail } from '@/components/auth/verify-email'

export const metadata: Metadata = {
	title: 'Верифікація пошти'
}

export default async function VerifyEmailPage() {
	return <VerifyEmail />
}
