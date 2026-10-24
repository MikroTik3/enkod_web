'use client'

import { IconChevronRight } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

import { Skeleton } from '../ui/skeleton'

import { CourseContent } from './course-content'
import { CourseSidebar } from './course-sidebar'
import type { CourseResponse, LessonResponse } from '@/api/generated'
import { getCompletedLessons } from '@/api/requests'
import { ROUTES } from '@/constants'
import { useAuth, useCurrent } from '@/hooks'

interface CourseDetailsProps {
	course: CourseResponse
	lessons: LessonResponse[]
}

function Breadcrumbs({ title }: { title: string }) {
	return (
		<nav
			aria-label='Навігація'
			className='text-muted-foreground flex items-center gap-1.5 text-sm'
		>
			<Link
				href={ROUTES.COURSES.ROOT}
				className='hover:text-foreground shrink-0 rounded-sm transition-colors'
			>
				Курси
			</Link>
			<IconChevronRight className='size-3.5 shrink-0' />
			<span
				aria-current='page'
				className='text-foreground truncate'
			>
				{title}
			</span>
		</nav>
	)
}

function CourseDetailsLayout({
	title,
	children
}: {
	title: string
	children: React.ReactNode
}) {
	return (
		<div className='mx-auto mt-25 max-w-screen-xl px-5 pb-10'>
			<Breadcrumbs title={title} />

			<div className='mt-6 grid grid-cols-1 gap-8 lg:grid-cols-6'>
				{children}
			</div>
		</div>
	)
}

function SidebarSkeleton() {
	return (
		<aside className='order-2 lg:col-span-2'>
			<div className='bg-card overflow-hidden rounded-3xl border lg:sticky lg:top-25'>
				<div className='flex flex-col gap-5 p-2'>
					<Skeleton className='aspect-video w-full rounded-2xl' />

					<div className='flex flex-col gap-4 px-2 pb-2'>
						<Skeleton className='h-9 w-40 rounded-md' />

						<div className='flex flex-col gap-3'>
							<Skeleton className='h-11 w-full rounded-full' />
							<Skeleton className='h-11 w-full rounded-full' />
							<Skeleton className='h-11 w-full rounded-full' />
						</div>
					</div>
				</div>

				{Array.from({ length: 3 }).map((_, i) => (
					<div
						key={i}
						className='flex items-center justify-between gap-4 border-t px-[20px] py-[14px]'
					>
						<Skeleton className='h-5 w-28 rounded-md' />
						<Skeleton className='h-5 w-16 rounded-md' />
					</div>
				))}
			</div>
		</aside>
	)
}

function ContentSkeleton() {
	return (
		<div className='order-2 col-span-1 min-w-0 lg:col-span-4'>
			<Skeleton className='h-10 w-3/4 rounded-md md:h-12' />
			<div className='mt-5 max-w-2xl space-y-3'>
				<Skeleton className='h-5 w-full rounded-md' />
				<Skeleton className='h-5 w-5/6 rounded-md' />
			</div>

			<section className='mt-12'>
				<Skeleton className='h-8 w-40 rounded-md' />
				<div className='mt-5 space-y-3'>
					<Skeleton className='h-4 w-full rounded-md' />
					<Skeleton className='h-4 w-full rounded-md' />
					<Skeleton className='h-4 w-11/12 rounded-md' />
					<Skeleton className='h-4 w-4/5 rounded-md' />
				</div>
			</section>

			<section className='mt-12'>
				<div className='flex items-baseline justify-between gap-6'>
					<Skeleton className='h-8 w-52 rounded-md' />
					<Skeleton className='h-4 w-28 rounded-md' />
				</div>
				<div className='mt-6 space-y-3'>
					{Array.from({ length: 4 }).map((_, i) => (
						<Skeleton
							key={i}
							className='h-14 w-full rounded-xl'
						/>
					))}
				</div>
			</section>
		</div>
	)
}

function CourseDetailsSkeleton({ title }: { title: string }) {
	return (
		<CourseDetailsLayout title={title}>
			<SidebarSkeleton />
			<ContentSkeleton />
		</CourseDetailsLayout>
	)
}

export function CourseDetails({ course, lessons }: CourseDetailsProps) {
	const { isAuthorized } = useAuth()
	const { isLoading: isUserLoading } = useCurrent()

	const { data: completedLessons = [], isLoading: isLessonsLoading } =
		useQuery({
			queryKey: ['completed lessons', course.id],
			queryFn: () => getCompletedLessons(course.id),
			enabled: isAuthorized
		})

	if (isUserLoading || isLessonsLoading) {
		return <CourseDetailsSkeleton title={course.title} />
	}

	return (
		<CourseDetailsLayout title={course.title}>
			<CourseSidebar
				course={course}
				lessons={lessons}
				completedLessons={completedLessons}
			/>
			<CourseContent
				course={course}
				lessons={lessons}
				completedLessons={completedLessons}
			/>
		</CourseDetailsLayout>
	)
}
