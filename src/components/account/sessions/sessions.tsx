'use client'

import { Fragment } from 'react'

import { Heading } from '@/components/shared/heading'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

import { RemoveAllSessions } from './remove-all-sessions'
import { SessionItem } from './session-item'
import { useGetSessions } from '@/api/hooks'

export function Sessions() {
	const { data, isLoading } = useGetSessions()

	const current = data?.[0]
	const others = data?.slice(1) ?? []

	return (
		<div className='w-full'>
			<div className='mx-auto flex h-full max-w-xl flex-col gap-6'>

				<h2 className='text-lg text-center font-medium'>Пристрої</h2>
				{isLoading ? (
					Array.from({ length: 4 }).map((_, index) => (
						<SessionsSkeleton key={index} />
					))
				) : (
					<Fragment>
						{current && (
							<section className='space-y-2'>
								<p className='px-1 text-xs font-medium uppercase tracking-wide text-muted-foreground/60'>
									Це пристрій
								</p>
								<Card className='rounded-2xl border-none bg-card/60 py-0 shadow-none'>
									<CardContent className='p-0'>
										<SessionItem
											session={current}
											isCurrentSession
										/>
									</CardContent>
								</Card>

								<p className="text-xs px-2 text-muted-foreground">Вийти з акаунта на всіх пристроях, крім цього.</p>
							</section>
						)}

						{others.length > 0 && (
							<section className='space-y-2'>
								<p className='px-1 text-xs font-medium uppercase tracking-wide text-muted-foreground/60'>
									Активні сесії
								</p>
								<Card className='overflow-hidden rounded-2xl border-none bg-card/60 py-0 shadow-none'>
									<CardContent className='p-0'>
										{others.map(session => (
	<SessionItem
		key={session.id}
		session={session}
	/>
))}
									</CardContent>
								</Card>
							</section>
						)}
					</Fragment>
				)}
			</div>
		</div>
	)
}

export function SessionsSkeleton() {
	return (
		<Card className='py-0 shadow-none'>
			<CardContent className='flex items-center justify-between p-4'>
				<div className='flex items-center gap-x-3'>
					<Skeleton className='size-10.5 rounded-lg' />
					<div className='flex flex-1 flex-col gap-2'>
						<Skeleton className='h-4 w-24 rounded-md' />
						<Skeleton className='h-3 w-40 rounded-md' />
					</div>
				</div>
				<Skeleton className='h-9 w-18 rounded-lg' />
			</CardContent>
		</Card>
	)
}