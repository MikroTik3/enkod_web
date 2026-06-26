import type { ReactNode } from 'react'

import { Header } from '@/components/layout/header'
import { UserNavigation } from '@/components/layout/user-navigation'

import { AccountProvider } from '@/providers/account-provider'

export default function AccountLayout({ children }: { children: ReactNode }) {
	return (
		<AccountProvider>
			<Header />
			<main className='flex w-full flex-col items-center pt-6'>
				<div className='mx-auto w-full max-w-7xl'>
					<div className='my-2 flex w-full flex-row flex-wrap gap-12 px-6 py-15 md:py-30 lg:flex-nowrap'>
						<div className='w-full lg:max-w-[19rem]'>
							<UserNavigation />
						</div>
						{children}
					</div>
				</div>
			</main>
		</AccountProvider>
	)
}
