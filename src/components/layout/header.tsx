'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
	MobileNav,
	NavBody,
	Navbar,
	NavbarLogo
} from '@/components/ui/resizable-navbar'

import { cn } from '@/lib/utils'

import { buttonVariants } from '../ui/button'

import MobileTrigger from './mobile-nav'
import { NavbarLinks } from './nav-links'
import { UserMenu } from './user-menu'
import { ROUTES } from '@/constants'
import { useSession } from '@/providers/auth-provider'

function GuestButtons() {
	return (
		<div className='flex items-center gap-2'>
			<Link
				href={ROUTES.AUTH.LOGIN()}
				className={cn(
					buttonVariants({ variant: 'ghost' }),
					'h-8 rounded-2xl'
				)}
			>
				Увійти
			</Link>
			<Link
				href={ROUTES.AUTH.REGISTER}
				className={cn(buttonVariants(), 'h-8 rounded-2xl')}
			>
				Реєстрація
			</Link>
		</div>
	)
}

export function Header() {
	const pathname = usePathname()
	const { isAuthorized } = useSession()

	const isAccountPage = pathname.startsWith('/account/')

	return (
		<div className='fixed z-50 h-16 w-full'>
			<Navbar>
				<NavBody>
					<NavbarLogo />
					<NavbarLinks />
					<div className='z-100 flex items-center gap-2'>
						{isAuthorized ? (
							<UserMenu />
						) : (
							<GuestButtons />
						)}
					</div>
				</NavBody>

				<MobileNav>
					<NavbarLogo />

					<div className='z-100 flex items-center gap-2'>
						{isAccountPage ? (
							<Link
								href={ROUTES.ACCOUNT.ROOT}
								className={cn(
									buttonVariants(),
									'h-8 rounded-2xl'
								)}
							>
								<ArrowLeft className='size-4' />
								Назад
							</Link>
						) : (
							!isAuthorized && <GuestButtons />
						)}

						<MobileTrigger />
					</div>
				</MobileNav>
			</Navbar>
		</div>
	)
}
