import type { Metadata } from 'next'

import { NewPasswordForm } from '@/components/auth/new-password-form'

export const metadata: Metadata = {
	title: 'Новий пароль'
}

export default async function NewPasswordPage() {
	return <NewPasswordForm />
}
