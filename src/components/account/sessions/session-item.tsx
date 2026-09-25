import { formatDate, getBrowserIcon } from '@/lib/utils'

import { Card, CardContent, CardFooter } from '../../ui/card'

import { RevokeSession } from './remove-session'
import type { SessionResponse } from '@/api/generated'
import { RemoveAllSessions } from './remove-all-sessions'

interface SessionItemProps {
	session: SessionResponse
	isCurrentSession?: boolean
}

export function SessionItem({ session, isCurrentSession }: SessionItemProps) {
	const Icon = getBrowserIcon(session.browser)

	console.log(isCurrentSession)

	return (
		<Card className='py-0 shadow-none gap-0'>
			<CardContent className='flex items-center justify-between gap-5 p-4 max-[440px]:flex-col max-[440px]:items-start'>
				<div className='flex items-center gap-x-3'>
					<div className='relative flex aspect-square size-10.5 items-center justify-center rounded-lg bg-linear-to-b from-neutral-200 to-neutral-200 align-middle shadow-none ring-1 ring-white ring-offset-2 ring-offset-neutral-200 ring-inset dark:from-neutral-800 dark:to-neutral-800 dark:ring-neutral-900 dark:ring-offset-neutral-800'>
						<Icon className='size-5' />
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

			{isCurrentSession && (
				<div className='border-t active:bg-gray-100 dark:active:bg-accent'>
						<RemoveAllSessions />
				</div>
			)}
		</Card>
	)
}
