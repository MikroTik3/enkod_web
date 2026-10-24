'use client'

import { IconArrowRight, IconDownload } from '@tabler/icons-react'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaYoutube } from 'react-icons/fa'
import { toast } from 'sonner'

import { Button } from '../ui/button'

import type { CourseResponse } from '@/api/generated'
import { generateDownloadLink } from '@/api/requests'
import { ROUTES } from '@/constants'
import { useAuth, useCurrent } from '@/hooks'

interface CourseActionsProps {
	course: CourseResponse
	lessonHref?: string
	lessonLabel: string
}

export function CourseActions({
	course,
	lessonHref,
	lessonLabel
}: CourseActionsProps) {
	const router = useRouter()
	const { isAuthorized } = useAuth()
	const { user } = useCurrent()

	const hasAccess = isAuthorized && !!user?.isPremium

	const { mutateAsync: generate, isPending: isGenerating } = useMutation({
		mutationFn: (courseId: string) => generateDownloadLink(courseId),
		onError() {
			toast.error('Не вдалося згенерувати посилання')
		}
	})

	const handleDownload = async () => {
		if (!hasAccess) return router.push(ROUTES.SUBSCRIPTION)

		try {
			const { url } = await generate(course.id)
			window.open(url)
		} catch (err) {
			console.error(err)
		}
	}

	return (
		<div className='flex flex-col gap-3'>
			{!hasAccess ? (
				<Button
					size='lg'
					disabled={true}
					className='w-full rounded-full'
					asChild
				>
					<Link href={ROUTES.SUBSCRIPTION}>
						Оформити підписку
						<IconArrowRight />
					</Link>
				</Button>
			) : lessonHref ? (
				<Button
					size='lg'
					disabled={true}
					className='w-full rounded-full'
					asChild
				>
					<Link href={lessonHref}>
						{lessonLabel}
						<IconArrowRight />
					</Link>
				</Button>
			) : (
				<Button
					size='lg'
					className='w-full rounded-full'
					disabled
				>
					Незабаром
				</Button>
			)}

			{course.youtubeUrl && (
				<Button
					variant='outline'
					size='lg'
					className='w-full rounded-full'
					asChild
				>
					<a
						href={course.youtubeUrl}
						target='_blank'
						rel='noopener noreferrer'
					>
						<FaYoutube />
						Дивитися на YouTube
					</a>
				</Button>
			)}

			<Button
				variant='secondary'
				size='lg'
				disabled={true}
				className='w-full rounded-full'
				onClick={handleDownload}
				isLoading={isGenerating}
			>
				<IconDownload />
				Завантажити вихідний код
			</Button>
		</div>
	)
}
