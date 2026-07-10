'use client'

import { Fragment } from 'react'

import { Heading } from '@/components/shared/heading'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

import { RemoveAllSessions } from './remove-all-sessions'
import { SessionItem } from './session-item'
import { useGetSessions } from '@/api/hooks'

export function Sessions() {
	const { data, isLoading } = useGetSessions()

	return (
		<div className='w-full'>
			<div className='mx-auto flex h-full max-w-5xl flex-col gap-4 rounded-xl'>
				{isLoading ? (
					Array.from({ length: 4 }).map((_, index) => (
						<SessionsSkeleton key={index} />
					))
				) : (
					<Fragment>
						<div className='block items-center justify-between space-y-3 md:flex md:space-y-0'>
							<Heading
								title='Пристрої'
								description='Тут відображаються пристрої, з яких виконано вхід у ваш обліковий запис'
							/>
							<RemoveAllSessions />
						</div>
						<div className='mt-2 space-y-5'>
							{data?.map((session, index) => (
								<SessionItem
									key={index}
									session={session}
									isCurrentSession={
										index === 0
									}
								/>
							))}
						</div>
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
					<Skeleton className='h-10 w-10 rounded-full' />
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
