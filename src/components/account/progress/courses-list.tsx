import { useQuery } from '@tanstack/react-query'
import { BookOpen, ChevronRight } from 'lucide-react'

import { CourseProgress } from '@/components/shared/course-progress'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

import { getMeProgress } from '@/api/requests'

interface CoursesListProps {
	onViewAll: () => void
}

export function CoursesList({ onViewAll }: CoursesListProps) {
	const { data, isLoading } = useQuery({
		queryKey: ['get me progress'],
		queryFn: () => getMeProgress()
	})

	return (
		<Card>
			<CardHeader>
				<CardTitle className='flex items-center text-lg font-medium'>
					<div className='bg-muted text-muted-foreground mr-2 flex size-7 items-center justify-center rounded-lg border'>
						<BookOpen className='size-4' />
					</div>
					Усі курси
				</CardTitle>
				<CardDescription>
					Ваш прогрес за курсами
				</CardDescription>
			</CardHeader>

			<Separator />

			<CardContent>
				{!isLoading && (!data || data.length === 0) ? (
					<div className='flex min-h-48 items-center justify-center'>
						<p className='text-muted-foreground text-center'>
							У вас поки що немає курсів.
						</p>
					</div>
				) : (
					<div className='space-y-4'>
						{data?.map(course => (
							<div
								key={course.id}
								className='space-y-2'
							>
								<div className='flex items-center justify-between'>
									<div className='font-medium'>
										{course.title}
									</div>
									<div className='text-muted-foreground text-sm'>
										{
											course.completedLessons
										}
										/
										{
											course.totalLessons
										}{' '}
										уроків
									</div>
								</div>

								<CourseProgress
									progress={course.progress}
									variant='success'
									className='h-2'
								/>
							</div>
						))}
					</div>
				)}
			</CardContent>

			<CardFooter>
				<Button className='w-full' onClick={onViewAll}>
					Детальніше
					<ChevronRight className='ml-2 size-4' />
				</Button>
			</CardFooter>
		</Card>
	)
}
