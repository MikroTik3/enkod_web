import type { Metadata } from 'next'

import { Preferences } from '@/components/account/appearance/preferences'

export const metadata: Metadata = {
      title: 'Сторонні сервіси'
}

export default function ConnectionsPage() {
      return <Preferences />
}
