import { IconBook, IconCode, IconEye } from '@tabler/icons-react'
import Image from 'next/image'

import { CourseActions } from './course-actions'
import type { CourseResponse, LessonResponse } from '@/api/generated'
import { ROUTES } from '@/constants'

interface CourseSidebarProps {
	course: CourseResponse
	lessons: LessonResponse[]
	completedLessons: string[]
}

function pluralizeLessons(count: number) {
	const mod10 = count % 10
	const mod100 = count % 100

	if (mod10 === 1 && mod100 !== 11) return 'урок'
	if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14))
		return 'уроки'
	return 'уроків'
}

function StatRow({
	icon: Icon,
	label,
	value
}: {
	icon: React.ComponentType<{ className?: string }>
	label: string
	value: string
}) {
	return (
		<div className='flex items-center justify-between gap-4 border-t px-[20px] py-[14px]'>
			<div className='text-muted-foreground flex items-center gap-3'>
				<Icon className='size-5' />
				<span>{label}</span>
			</div>
			<span className='font-medium'>{value}</span>
		</div>
	)
}

export function CourseSidebar({
	course,
	lessons,
	completedLessons
}: CourseSidebarProps) {
	const hasLessons = lessons.length > 0
	const hasProgress = completedLessons.length > 0

	const lastCompletedId = completedLessons[completedLessons.length - 1]
	const lastIndex = lessons.findIndex(
		lesson => lesson.id === lastCompletedId
	)
	const isFinished = hasLessons && lastIndex + 1 === lessons.length
	const nextLesson = lessons[lastIndex + 1] ?? lessons[0]

	const lessonLabel = isFinished
		? 'Дивитися курс знову'
		: hasProgress
			? 'Продовжити навчання'
			: 'Почати перегляд'

	return (
		<aside className='order-2 lg:col-span-2'>
			<div className='bg-card overflow-hidden rounded-3xl border lg:sticky lg:top-25'>
				<div className='flex flex-col gap-5 p-2'>
					{course.thumbnail && (
						<div className='relative aspect-video overflow-hidden rounded-2xl'>
							<Image
								src={course.thumbnail}
								alt={course.title}
								fill
								className='object-cover'
							/>
						</div>
					)}

					<div className='flex flex-col gap-4 px-2 pb-2'>
						<p className='text-3xl font-medium'>
							За підпискою
						</p>

						<CourseActions
							course={course}
							lessonLabel={lessonLabel}
							lessonHref={
								hasLessons
									? ROUTES.COURSES.LESSON(
											nextLesson.id
										)
									: undefined
							}
						/>
					</div>
				</div>

				<StatRow
					icon={IconBook}
					label='Уроки'
					value={`${lessons.length} ${pluralizeLessons(lessons.length)}`}
				/>
				<StatRow
					icon={IconEye}
					label='Перегляди'
					value={course.views.toLocaleString('uk-UA')}
				/>
				<StatRow
					icon={IconCode}
					label='Вихідний код'
					value='Є'
				/>
			</div>
		</aside>
	)
}
