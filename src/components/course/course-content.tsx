'use client'

import { IconChevronDown } from '@tabler/icons-react'
import { useState } from 'react'

import { cn } from '@/lib/utils'

import { CourseLessons } from './course-lessons'
import type { CourseResponse, LessonResponse } from '@/api/generated'

const DESCRIPTION_PREVIEW_LENGTH = 520

interface CourseContentProps {
	course: CourseResponse
	lessons: LessonResponse[]
	completedLessons: string[]
}

export function CourseContent({
	course,
	lessons,
	completedLessons
}: CourseContentProps) {
	const lessonIds = new Set(lessons.map(lesson => lesson.id))
	const completed = completedLessons.filter(id => lessonIds.has(id))

	return (
		<div className='order-2 col-span-1 min-w-0 lg:col-span-4'>
			<h1 className='text-4xl font-semibold tracking-tight text-balance md:text-5xl'>
				{course.title}
			</h1>

			{course.shortDescription && (
				<p className='text-muted-foreground mt-5 max-w-2xl text-lg leading-relaxed sm:text-xl'>
					{course.shortDescription}
				</p>
			)}

			{course.fullDescription && (
				<section className='mt-12'>
					<h2 className='text-2xl font-semibold md:text-3xl'>
						Про курс
					</h2>
					<Description text={course.fullDescription} />
				</section>
			)}

			{lessons.length > 0 && (
				<section className='mt-12'>
					<div className='flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1'>
						<h2 className='text-2xl font-semibold md:text-3xl'>
							Програма курсу
						</h2>
						<p className='text-muted-foreground text-sm'>
							{completed.length} із {lessons.length}{' '}
							пройдено
						</p>
					</div>

					<div className='mt-6'>
						<CourseLessons
							lessons={lessons}
							completedLessons={completed}
						/>
					</div>
				</section>
			)}
		</div>
	)
}

function Description({ text }: { text: string }) {
	const [isExpanded, setIsExpanded] = useState(false)

	const paragraphs = splitParagraphs(text)
	const isLong = text.length > DESCRIPTION_PREVIEW_LENGTH

	return (
		<div className='mt-5'>
			<div
				className={cn(
					'text-foreground/85 space-y-4 text-[17px] leading-relaxed',
					isLong &&
						!isExpanded &&
						'max-h-56 overflow-hidden mask-[linear-gradient(to_bottom,black_55%,transparent)]'
				)}
			>
				{paragraphs.map((paragraph, index) => (
					<p key={index} className='whitespace-pre-line'>
						{paragraph}
					</p>
				))}
			</div>

			{isLong && (
				<button
					type='button'
					onClick={() => setIsExpanded(value => !value)}
					aria-expanded={isExpanded}
					className='mt-3 inline-flex items-center gap-1 rounded-sm text-sm font-medium text-blue-600 underline-offset-4 hover:underline dark:text-blue-500'
				>
					{isExpanded ? 'Згорнути' : 'Показати повністю'}
					<IconChevronDown
						className={cn(
							'size-4 transition-transform',
							isExpanded && 'rotate-180'
						)}
					/>
				</button>
			)}
		</div>
	)
}

function splitParagraphs(text: string) {
	return text
		.replace(/\\n/g, '\n')
		.replace(/\r\n?/g, '\n')
		.split(/\n{2,}/)
		.map(paragraph => paragraph.trim())
		.filter(Boolean)
}
