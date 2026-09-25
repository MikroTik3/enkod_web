import type { Metadata } from 'next'

import { Privacy } from '@/components/account/privacy/privacy'

export const metadata: Metadata = {
      title: 'Приватність і безпека'
}

export default function PrivacyPage() {
      return <Privacy />
}
