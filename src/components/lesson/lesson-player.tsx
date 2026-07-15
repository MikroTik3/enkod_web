'use client'

import { useEffect, useRef, useState } from 'react'

interface LessonPlayerProps {
	videoId: string
}

export function LessonPlayer({ videoId }: LessonPlayerProps) {
	const embedUrl = `https://kinescope.io/embed/${videoId}`

	const [isInView, setIsInView] = useState(false)
	const [iframeLoaded, setIframeLoaded] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!containerRef.current) return

		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						setIsInView(true)
						observer.disconnect()
					}
				})
			},
			{ threshold: 0.3 }
		)

		observer.observe(containerRef.current)
		return () => observer.disconnect()
	}, [])

	return (
		<div
			ref={containerRef}
			className='bg-muted relative mx-auto aspect-video w-full max-w-5xl overflow-hidden rounded-lg'
		>
			{!iframeLoaded && (
				<div className='bg-muted absolute inset-0 flex flex-col items-center justify-center'>
					<div className='text-muted-foreground z-10 text-base'>
						Загрузка видео…
					</div>
				</div>
			)}

			{isInView && (
				<iframe
					className='h-full w-full'
					src={embedUrl}
					allow='fullscreen; picture-in-picture; encrypted-media'
					allowFullScreen
					frameBorder='0'
					onLoad={() => setIframeLoaded(true)}
				/>
			)}
		</div>
	)
}
