'use client'

export const TextEffect = ({ text }: { text: string }) => {
	return (
		<p
			className='absolute inset-x-0 top-0 w-full text-center leading-none font-bold text-transparent dark:block'
			style={{
				fontSize: 'clamp(3rem, 18vw, 20rem)',
				letterSpacing: '-0.02em'
			}}
		>
			<span
				className='dark:hidden'
				style={{
					WebkitTextStroke: '1px var(--color-neutral-200)',
					fill: '#fff'
				}}
			>
				{text}
			</span>

			<span
				className='hidden dark:inline'
				style={{
					WebkitTextStroke: '1px var(--color-neutral-700)',
					fill: '#fff'
				}}
			>
				{text}
			</span>
		</p>
	)
}
