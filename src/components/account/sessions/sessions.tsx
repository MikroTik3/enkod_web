'use client'

import { Loader2 } from 'lucide-react'
import { Fragment } from 'react'

import { Heading } from '@/components/shared/heading'

import { RemoveAllSessions } from './remove-all-sessions'
import { SessionItem } from './session-item'
import { useGetSessions } from '@/api/hooks'

export function Sessions() {
	const { data, isLoading } = useGetSessions()

	return (
		<div className='w-full'>
			<div className='mx-auto flex h-full max-w-5xl flex-col gap-4 rounded-xl'>
				{isLoading ? (
					<div className='flex h-[75vh] items-center justify-center'>
						<Loader2 className='text-muted-foreground size-10 animate-spin' />
					</div>
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
