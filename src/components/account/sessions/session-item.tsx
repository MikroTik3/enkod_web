import { formatDate, getBrowserIcon } from '@/lib/utils'

import { Card, CardContent, CardFooter } from '../../ui/card'

import { RemoveAllSessions } from './remove-all-sessions'
import { RevokeSession } from './remove-session'
import type { SessionResponse } from '@/api/generated'

interface SessionItemProps {
	session: SessionResponse
	isCurrentSession?: boolean
}

export function SessionItem({ session, isCurrentSession }: SessionItemProps) {
	const Icon = getBrowserIcon(session.browser)

	console.log(isCurrentSession)

	return (
		<Card className='gap-0 rounded-none border-0 border-b border-black/10 bg-transparent py-0 shadow-none ring-0 last:border-b-0 dark:border-white/10'>
			<CardContent className='flex items-center justify-between gap-5 p-4 max-[440px]:flex-col max-[440px]:items-start'>
				<div className='flex w-[stretch] items-start justify-between'>
					<div className='flex items-start gap-x-3'>
						<div className='relative flex aspect-square size-10.5 items-center justify-center rounded-lg bg-linear-to-b from-neutral-200 to-neutral-200 align-middle shadow-none ring-1 ring-white ring-offset-2 ring-offset-neutral-200 ring-inset dark:from-neutral-800 dark:to-neutral-800 dark:ring-neutral-900 dark:ring-offset-neutral-800'>
							<Icon className='size-5' />
						</div>

						<div>
							<h2 className='font-semibold'>
								{session.browser}, {session.os}
							</h2>
							<p className='text-muted-foreground text-sm'>
								{session.city},{' '}
								{session.country}
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

					{isCurrentSession && (
						<span className='mr-1 inline-flex items-center'>
							<span className='text-emerald-500'>
								онлайн
							</span>
						</span>
					)}
				</div>

				{!isCurrentSession && <RevokeSession id={session.id} />}
			</CardContent>

			{isCurrentSession && (
				<div className='dark:active:bg-accent border-t active:bg-gray-100'>
					<RemoveAllSessions />
				</div>
			)}
		</Card>
	)
}
