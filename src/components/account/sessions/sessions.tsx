'use client'

import { Fragment } from 'react'

import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

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
					<div className='overflow-hidden rounded-3xl border border-black/10 bg-white dark:border-white/10 dark:bg-neutral-900'>
						{Array.from({ length: 4 }).map((_, index) => (
							<SessionsSkeleton key={index} />
						))}
					</div>
				) : (
					<Fragment>
						{current && (
							<section className='space-y-2'>
								<p className='px-1 text-xs font-medium uppercase tracking-wide text-muted-foreground/60'>
									Це пристрій
								</p>

								<div className='overflow-hidden rounded-3xl border border-black/10 bg-white dark:border-white/10 dark:bg-neutral-900'>
									<SessionItem
										session={current}
										isCurrentSession
									/>
								</div>

								<p className="text-xs px-2 text-muted-foreground">Вийти з акаунта на всіх пристроях, крім цього.</p>
							</section>
						)}

						{others.length > 0 && (
							<section className='space-y-2'>
								<p className='px-1 text-xs font-medium uppercase tracking-wide text-muted-foreground/60'>
									Активні сесії
								</p>
								{others.map(session => (
									<SessionItem
										key={session.id}
										session={session}
									/>
								))}
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
		<Card className='rounded-none border-0 border-b border-black/10 bg-transparent py-0 shadow-none ring-0 last:border-b-0 dark:border-white/10'>
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