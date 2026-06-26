import type { Metadata } from 'next'

import { LoginForm } from '@/components/auth/login-form'

export const metadata: Metadata = {
	title: 'Увійти в обліковий запис'
}

export default function LoginPage() {
	return <LoginForm />
}
