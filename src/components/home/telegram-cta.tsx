import Link from 'next/link'
import { RiTelegram2Fill } from 'react-icons/ri'

export function TelegramCTA() {
	return (
		<section
			id='telegram-cta'
			className='mx-auto max-w-335 px-4 py-10 md:px-8 md:py-20 lg:py-32'
		>
			<div className='relative z-20 mx-auto w-full overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-gray-900 dark:from-neutral-900'>
				<div
					className='bg-noise absolute inset-0 h-full w-full opacity-10'
					style={{
						backgroundImage: 'url(/images/noise.webp)',
						backgroundSize: '30%'
					}}
				/>

				<div
					className='pointer-events-none absolute top-0 right-0 bottom-0 w-96 overflow-hidden select-none'
					style={{
						maskImage:
							'radial-gradient(33.875rem 33.875rem at calc(100% - 8.9375rem) 0, white 3%, transparent 70%)',
						WebkitMaskImage:
							'radial-gradient(33.875rem 33.875rem at calc(100% - 8.9375rem) 0, white 3%, transparent 70%)'
					}}
				/>

				<div className='relative px-6 pt-20 pb-14 sm:px-10 sm:pb-20 lg:px-18'>
					<div className='flex flex-col items-center gap-4 text-center'>
						<h2 className='text-2xl tracking-tight text-balance text-white md:text-4xl lg:text-5xl dark:text-neutral-300'>
							Приєднуйся до нас у Telegram
						</h2>
						<p className='max-w-160 text-sm text-neutral-200 md:text-base lg:text-lg dark:text-neutral-400'>
							Підписуйся на наш канал! Отримуй
							останні новини, спілкуйся з
							однодумцями та будь у курсі
							найактуальніших подій.
						</p>
					</div>

					<div className='relative z-10 mx-auto mt-6 flex justify-center gap-4'>
						<Link
							href='https://t.me/enkod_community'
							target='_blank'
							rel='noopener noreferrer'
							className='group mx-auto flex cursor-pointer items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-2.5 font-medium text-white shadow-[0px_0px_10px_0px_rgba(255,255,255,0.2)_inset] ring ring-white/20 ring-offset-2 ring-offset-blue-700 transition-all duration-200 ring-inset hover:shadow-[0px_0px_20px_0px_rgba(255,255,255,0.35)_inset] hover:ring-white/40 active:scale-98 dark:bg-blue-500 dark:ring-offset-blue-600'
						>
							Детальніше
							<RiTelegram2Fill className='size-5' />
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}
