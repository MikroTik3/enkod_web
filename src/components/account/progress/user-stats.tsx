import { useQuery } from '@tanstack/react-query'
import { BookOpen, Trophy } from 'lucide-react'
import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

import { getMeStatistics } from '@/api/requests'

export function UserStats() {
	const { data, isLoading } = useQuery({
		queryKey: ['get me statistics'],
		queryFn: () => getMeStatistics()
	})

	return isLoading ? (
		<div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
			<Skeleton className='h-[170px] w-full' />
			<Skeleton className='h-[170px] w-full' />
		</div>
	) : (
		<div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs sm:grid-cols-1 lg:grid-cols-2'>
			<Card className='justify-between'>
				<CardHeader className='pb-2'>
					<CardTitle className='flex flex-col items-start gap-2'>
						<div className='bg-muted text-muted-foreground flex size-7 items-center justify-center rounded-lg border'>
							<Trophy className='size-4' />
						</div>
						<span className='text-muted-foreground text-sm font-light'>
							Бали та рейтинг
						</span>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='flex items-center justify-between'>
						<div>
							<div className='text-3xl font-bold'>
								{data?.totalPoints}
							</div>
							<div className='text-muted-foreground text-sm font-light'>
								Усього балів
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className='pb-2'>
					<CardTitle className='flex flex-col items-start gap-2'>
						<div className='bg-muted text-muted-foreground flex size-7 items-center justify-center rounded-lg border'>
							<BookOpen className='size-4' />
						</div>
						<span className='text-muted-foreground text-sm font-light'>
							Прогрес навчання
						</span>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='flex items-center justify-between'>
						<div>
							<div className='text-3xl font-bold'>
								{data?.lessonsCompleted}
							</div>
							<div className='text-muted-foreground text-sm'>
								Пройдено уроків
							</div>
						</div>
						<div className='size-15'>
							<CircularProgressbar
								value={
									data?.learningProgressPercentage ??
									0
								}
								text={`${data?.learningProgressPercentage ?? 0}%`}
								styles={buildStyles({
									textColor: '#000000'
								})}
							/>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
