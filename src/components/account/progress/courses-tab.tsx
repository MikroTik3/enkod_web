import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

import { CourseProgress } from '@/components/shared/course-progress'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

import { getMeProgress } from '@/api/requests'
import { ROUTES } from '@/constants'

export function CoursesTab() {
	const { data, isLoading } = useQuery({
		queryKey: ['get me progress'],
		queryFn: () => getMeProgress()
	})

	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-lg font-medium'>
					Курсы
				</CardTitle>
				<CardDescription>
					Ваш прогресс по всем курсам
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='space-y-6'>
					{data?.map(course => (
						<div key={course.id} className='space-y-2'>
							<div className='flex items-center justify-between'>
								<div className='font-medium'>
									{course.title}
								</div>
								<div className='text-muted-foreground text-sm'>
									{course.completedLessons}/
									{course.totalLessons}{' '}
									уроков
								</div>
							</div>
							<div className='flex items-center gap-4'>
								<CourseProgress
									progress={course.progress}
									variant={
										course.progress ===
										100
											? 'success'
											: 'default'
									}
									className='h-2 flex-1'
								/>
								<span className='text-sm font-medium'>
									{course.progress}%
								</span>
							</div>
							<div className='text-muted-foreground flex justify-between text-sm'>
								<span>
									Последний доступ:{' '}
									{new Date(
										course.lastAccessed
									).toLocaleDateString()}
								</span>
								{course.lastLesson && (
									<Button
										variant='link'
										size='sm'
										className='h-auto p-0'
										asChild
									>
										<Link
											href={ROUTES.COURSES.LESSON(
												course
													.lastLesson
													?.id
											)}
										>
											Продолжить
											обучение
										</Link>
									</Button>
								)}
							</div>
							{course.id !==
								data[data.length - 1].id && (
								<Separator className='mt-4' />
							)}
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	)
}
