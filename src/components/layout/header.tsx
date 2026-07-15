'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import {
	MobileNav,
	NavBody,
	Navbar,
	NavbarLogo
} from '@/components/ui/resizable-navbar'

import { useAuth } from '@/hooks/useAuth'

import MobileTrigger from './mobile-nav'
import { NavbarLinks } from './nav-links'
import { UserMenu } from './user-menu'
import { ROUTES } from '@/constants'

export function Header() {
	const [isAuth, setIsAuth] = useState<boolean | null>()

	const { isAuthorized } = useAuth()

	useEffect(() => {
		setIsAuth(isAuthorized)
	}, [])

	return (
		<div className='fixed z-50 h-16 w-full'>
			<Navbar>
				<NavBody>
					<NavbarLogo />
					<NavbarLinks />
					<div className='z-100 flex items-center gap-2'>
						{isAuth ? (
							<UserMenu />
						) : (
							<Link
								className='hover:text-foreground/80 text-foreground/60 mx-3 text-sm font-medium transition-colors'
								href={ROUTES.AUTH.LOGIN()}
							>
								Увійти
							</Link>
						)}
					</div>
				</NavBody>
				<MobileNav>
					<NavbarLogo />

					<div className='z-100 flex items-center gap-2'>
						<MobileTrigger />
					</div>
				</MobileNav>
			</Navbar>
		</div>
	)
}
