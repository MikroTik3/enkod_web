import { IconDownload } from '@tabler/icons-react'
import { FaYoutube } from 'react-icons/fa'
import Link from 'next/link'

import { Button } from '../ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '../ui/card'
import { useRouter } from 'next/router'
import { useAuth, useCurrent } from '@/hooks'
import { useMutation } from '@tanstack/react-query'
import { generateDownloadLink } from '@/api/requests'
import { ROUTES } from '@/constants'
import { toast } from 'sonner'
import type { CourseResponse } from '@/api/generated'

interface CourseActionsProps {
	course: CourseResponse
}

export function CourseActions({ course }: CourseActionsProps) {
	const router = useRouter()
	const { isAuthorized } = useAuth()
	const { user } = useCurrent()

	const { mutateAsync: generate, isPending: isGenerating } = useMutation({
		mutationFn: (courseId: string) => generateDownloadLink(courseId),
		onError() {
			toast.error('Не удалось сгенерировать ссылку')
		}
	})

	const handleDownload = async () => {
		if (!isAuthorized || !user?.isPremium)
			return router.push(ROUTES.SUBSCRIPTION)

		try {
			const { url } = await generate(course.id)

			window.open(url)
		} catch (err) {
			console.error(err)
		}
	}


	return (
		<Card className='relative flex flex-col gap-5'>
			<CardHeader>
				<CardTitle className='text-foreground text-xl font-semibold'>
					Матеріали курсу
				</CardTitle>
				<CardDescription className='text-sm text-neutral-600 dark:text-neutral-300'>
					Завантажте вихідний код проєкту та перегляньте
					повний відеокурс, щоб крок за кроком повторити
					весь процес розробки.
				</CardDescription>
			</CardHeader>

			<CardContent className='flex flex-col gap-2'>
				<Button 
                                   className='w-full'
					onClick={handleDownload}
					isLoading={isGenerating}
                            >
					<IconDownload />
					Завантажити код
				</Button>

                            {course.youtubeUrl && (
                                   <Button variant='outline' className='w-full' asChild>
                                          <Link href={course.youtubeUrl as any} target='_blank'>
                                                 <FaYoutube />
                                                 Дивитися на YouTube
                                          </Link>
                                   </Button>
                            )}
			</CardContent>
		</Card>
	)
}
