import type { Metadata } from 'next'

import { Connections } from '@/components/account/connections/connections'

export const metadata: Metadata = {
	title: 'Сторонні сервіси'
}

export default function ConnectionsPage() {
	return <Connections />
}
