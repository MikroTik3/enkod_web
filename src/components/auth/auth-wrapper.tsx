import { Route } from 'next'
import Link from 'next/link'
import { type ReactNode, useEffect, useState } from 'react'

import { AuroraBackground } from '../ui/aurora-background'
import { TypingAnimation } from '../ui/typing-animation'

import { AuthSocial } from './auth-social'

interface AuthWrapperProps {
	children: ReactNode
	heading: string
	description?: string
	bottomText?: string
	bottomLinkText?: string
	bottomLinkHref?: Route
	isShowSocial?: boolean
}

export function AuthWrapper({
	children,
	heading,
	description,
	bottomText,
	bottomLinkText,
	bottomLinkHref,
	isShowSocial
}: AuthWrapperProps) {
	const [phrase, setPhrase] = useState<string>('')

	useEffect(() => {
		const phrases = [
			'Весь Enkod був зроблений за 2 пляшки Живчика, одну шоколадку Roshen і критично низький рівень здорового глузду, але результат чомусь працює краще, ніж планувалося :)',
			`Кажуть, що кожен баг має свою причину, але в цьому проєкті більшість із них з'явилися після фрази "та давай швиденько доробимо".`,
			'Цей проєкт пережив більше рефакторингів, ніж середньостатистичний студент змінює плани на майбутнє після першої сесії.',
			'Жоден живчик не постраждав під час створення цього продукту.'
		]

		const randomIndex = Math.floor(Math.random() * phrases.length)
		const selectedWord = phrases[randomIndex]

		setPhrase(selectedWord)
	}, [])

	return (
		<div className='relative container mx-auto flex min-h-svh w-full flex-col items-center justify-center lg:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
			<div className='w-full px-4 py-8 sm:px-6 md:py-12'>
				<div className='mx-auto flex w-full max-w-100 flex-col justify-center space-y-5'>
					<div className='flex flex-col space-y-3 text-center'>
						<h1 className='text-3xl font-semibold'>
							{heading}
						</h1>
						{description && (
							<p className='text-muted-foreground text-sm'>
								{description}
							</p>
						)}
					</div>

					<div className='p-0'>{children}</div>

					<div className='relative'>
						<div className='absolute inset-0 flex items-center'>
							<span className='w-full border-t border-neutral-300 dark:border-neutral-700' />
						</div>
						<div className='relative flex justify-center text-sm leading-6 font-medium'>
							<span className='bg-white px-6 text-neutral-400 dark:bg-black dark:text-neutral-500'>
								Або продовжуйте
							</span>
						</div>
					</div>

					{isShowSocial && <AuthSocial />}

					{bottomText &&
						bottomLinkText &&
						bottomLinkHref && (
							<p className='text-muted-foreground text-center text-sm'>
								{bottomText}{' '}
								<Link
									href={bottomLinkHref}
									className='font-medium text-black'
								>
									{bottomLinkText}
								</Link>
							</p>
						)}
				</div>

				<div className='text-muted-foreground absolute right-4 bottom-4 flex items-center justify-center gap-4'></div>
			</div>

			<AuroraBackground className='text-primary relative hidden min-h-full flex-col border-l p-10 lg:flex'>
				<TypingAnimation
					className='max-w-117.5 text-center text-lg'
					typeSpeed={50}
					deleteSpeed={150}
					pauseDelay={2000}
				>
					{phrase}
				</TypingAnimation>
			</AuroraBackground>
		</div>
	)
}
