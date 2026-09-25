'use client'

import { usePathname } from 'next/navigation'

export function EmptyContent() {
	const pathname = usePathname()

	if (pathname === '/account') {
		return (
			<div className='hidden w-full items-center justify-center rounded-3xl lg:flex'>
				<span>Оберіть потрібний розділ у меню зліва</span>
			</div>
		)
	}

	return null
}