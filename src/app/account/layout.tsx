'use client'

import type { ReactNode } from 'react'

import { Header } from '@/components/layout/header'

import { AccountProvider } from '@/providers/account-provider'
import { ProfileCard } from '@/components/shared/profile-card'
import { UserNavigation } from '@/components/layout/user-navigation'
import { EmptyContent } from '@/components/shared/empty-content'
import { usePathname } from 'next/navigation'

export default function AccountLayout({ children }: { children: ReactNode }) {
	const pathname = usePathname()

	return (
		<AccountProvider>
			<Header />
			<main className='flex w-full flex-col items-center pt-6'>
				<div className='mx-auto w-full max-w-7xl'>
					<div className='my-2 flex w-full flex-row min-h-screen flex-wrap gap-12 px-6 py-15 md:py-30 lg:flex-nowrap'>
						{pathname !== '/account' ? (
							<div className='w-full lg:max-w-76  lg:block hidden'>
								<ProfileCard />
								<UserNavigation />
							</div>
						) : ''}
						
						{children}
						<EmptyContent />
					</div>
				</div>
			</main>
		</AccountProvider>
	)
}
