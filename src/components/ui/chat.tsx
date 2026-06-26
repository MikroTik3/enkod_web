'use client'
import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

import { cn } from '@/lib/utils'

export function ChatConversation({ className }: { className?: string }) {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, margin: '-50px' })

	const messages = [
		{
			id: 1,
			name: 'Студент',
			avatar: 'https://cybersport.metaratings.ru/_images/insecure/w-1360:h-1360/aHR0cHM6Ly9zdG9yYWdlLnlhbmRleGNsb3VkLm5ldC9zMy1tZXRhcmF0aW5ncy1zdG9yYWdlL2ltYWdlcy9iNy84Zi9iNzhmNzRhNTEzNDZjOWZkN2E3ZTg4M2VjMzdlOTg1Mi5wbmc=.webp',
			text: 'Привіт! Підкажіть, які мови програмування у вас є на курсах?',
			isUser: false
		},
		{
			id: 2,
			name: 'Ви',
			avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Volodymyr_Zelensky_Official_portrait.jpg/500px-Volodymyr_Zelensky_Official_portrait.jpg',
			text: 'Є кілька напрямів: фронтенд, бекенд і повний стек. Можеш обрати з того, що цікаво 👍',
			isUser: true
		},
		{
			id: 3,
			name: 'Студент',
			avatar: 'https://cybersport.metaratings.ru/_images/insecure/w-1360:h-1360/aHR0cHM6Ly9zdG9yYWdlLnlhbmRleGNsb3VkLm5ldC9zMy1tZXRhcmF0aW5ncy1zdG9yYWdlL2ltYWdlcy9iNy84Zi9iNzhmNzRhNTEzNDZjOWZkN2E3ZTg4M2VjMzdlOTg1Mi5wbmc=.webp',
			text: 'Ага, зрозумів. А конкретно які технології там?',
			isUser: false
		}
	]

	return (
		<div
			className={cn(
				'flex min-h-60 items-center justify-center p-4',
				className
			)}
		>
			<div ref={ref} className='flex flex-col justify-center gap-3'>
				{messages.map((message, index) => {
					const baseDelay = index * 0.3
					return (
						<div
							key={message.id}
							className={`flex items-start gap-3 ${message.isUser ? 'flex-row-reverse' : ''}`}
						>
							<motion.img
								src={message.avatar}
								alt={message.name}
								initial={{
									opacity: 0,
									scale: 0.5
								}}
								animate={
									isInView
										? {
												opacity: 1,
												scale: 1
											}
										: {}
								}
								transition={{
									duration: 0.3,
									delay: baseDelay
								}}
								className='size-8 shrink-0 rounded-full object-cover'
							/>
							<motion.div
								initial={{
									opacity: 0,
									x: message.isUser
										? 10
										: -10
								}}
								animate={
									isInView
										? {
												opacity: 1,
												x: 0
											}
										: {}
								}
								transition={{
									duration: 0.3,
									delay: baseDelay + 0.15
								}}
								className='rounded-xl bg-white px-3 py-2 text-sm text-neutral-700 shadow-sm ring-1 shadow-black/5 ring-black/5'
							>
								{message.text}
							</motion.div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
