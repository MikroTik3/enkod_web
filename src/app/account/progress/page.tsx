import type { Metadata } from 'next'

import { Progress } from '@/components/account/progress/progress'

export const metadata: Metadata = {
	title: 'Мiй прогресс'
}

export default function ProgressPage() {
	return <Progress />
}
