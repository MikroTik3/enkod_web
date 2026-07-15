'use client'

import { Marquee } from './marquee'

const style =
	'flex min-w-24 items-center justify-center space-x-1 rounded-md border dark:bg-zinc-950 bg-white px-2 py-1 text-sm shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] dark:bg-neutral-900' as const

const languages = [
	'Next.js',
	'React',
	'TypeScript',
	'Tailwind CSS',
	'Nest.js'
] as const

export const MarqueeLanguagesSkeleton = () => {
	return (
		<div className='dark:bg-card relative mt-10 flex flex-col items-center bg-white'>
			<Marquee pauseOnHover reverse className='[--duration:50s]'>
				{languages.map((language, index) => (
					<span className={style} key={index}>
						{language}
					</span>
				))}
			</Marquee>

			<Marquee pauseOnHover className='[--duration:20s]'>
				{languages.map((language, index) => (
					<span className={style} key={index}>
						{language}
					</span>
				))}
			</Marquee>

			<Marquee pauseOnHover reverse className='[--duration:20s]'>
				{languages.map((language, index) => (
					<span className={style} key={index}>
						{language}
					</span>
				))}
			</Marquee>
		</div>
	)
}
