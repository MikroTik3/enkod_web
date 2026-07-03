import { formatDate, getBrowserIcon } from '@/lib/utils'

import { Card, CardContent } from '../../ui/card'

import { RevokeSession } from './remove-session'
import type { SessionResponse } from '@/api/generated'

interface SessionItemProps {
	session: SessionResponse
	isCurrentSession?: boolean
}

export function SessionItem({ session, isCurrentSession }: SessionItemProps) {
	const Icon = getBrowserIcon(session.browser)

	return (
		<Card className='py-0 shadow-none'>
			<CardContent className='flex max-[440px]:flex-col max-[440px]:items-start items-center justify-between gap-5 p-4'>
				<div className='flex items-center gap-x-3'>
					<div className='rounded-lg border p-2.5'>
						<Icon className='size-5 ' />
					</div>
					<div>
						<h2 className='font-semibold'>
							{session.browser}, {session.os}
						</h2>
						<p className='text-muted-foreground text-sm'>
							{isCurrentSession && (
								<span className='mr-1 inline-flex items-center'>
									<span className='relative mr-2 flex size-2'>
										<span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75' />
										<span className='relative inline-flex size-2 rounded-full bg-emerald-500' />
									</span>
									<span className='text-emerald-500'>
										Поточний пристрій
									</span>
									<span className='mr-1 ml-2'>
										•
									</span>
								</span>
							)}
							{session.city}, {session.country}
							{!isCurrentSession && (
								<>
									{' '}
									•{' '}
									{formatDate(
										session.createdAt
									)}
								</>
							)}
						</p>
					</div>
				</div>
				{!isCurrentSession && <RevokeSession id={session.id} />}
			</CardContent>
		</Card>
	)
}
