import { Profile } from '@/components/account/profile/profile'
import type { Metadata } from 'next'


export const metadata: Metadata = {
      title: 'Мiй профіль'
}

export default function ProfilePage() {
      return <Profile />
}
