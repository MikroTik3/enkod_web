import Link from 'next/link'
import { FaGithub, FaTelegram, FaYoutube } from 'react-icons/fa'
import { FaLinkedin } from 'react-icons/fa6'

import { TextEffect } from '../ui/text-effect'

import { ROUTES } from '@/constants'

export function Footer() {
	return (
		<footer className='relative w-full overflow-hidden border-t border-neutral-100 bg-white px-8 pt-20 dark:border-white/10 dark:bg-neutral-950'>
			<div className='mx-auto flex max-w-335 flex-col items-start justify-between text-sm text-neutral-500 sm:flex-row md:px-8'>
				<div>
					<div className='mr-0 mb-4 md:mr-4 md:flex'>
						<Link
							href={ROUTES.HOME}
							className='relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal'
						>
							<img
								src='https://simplistic-saas-template.vercel.app/_next/image?url=https%3A%2F%2Fassets.aceternity.com%2Flogo-dark.png&w=64&q=75'
								alt='logo'
								width={30}
								height={30}
							/>

							<span className='font-medium text-black dark:text-white'>
								Enkod
							</span>
						</Link>
					</div>

					<div className='mt-4 ml-2 flex items-center gap-4'>
						<Link
							href='https://github.com/MikroTik3'
							target='_blank'
							rel='noopener noreferrer'
							aria-label='Twitter'
							className='text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
						>
							<FaGithub className='size-5' />
						</Link>

						<Link
							href='https://www.linkedin.com/in/artur-docenko/'
							target='_blank'
							rel='noopener noreferrer'
							aria-label='LinkedIn'
							className='text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
						>
							<FaLinkedin className='size-5' />
						</Link>

						<Link
							href='https://t.me/enkod_community'
							target='_blank'
							rel='noopener noreferrer'
							aria-label='LinkedIn'
							className='text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
						>
							<FaTelegram className='size-5' />
						</Link>

						<Link
							href='/'
							target='_blank'
							rel='noopener noreferrer'
							aria-label='LinkedIn'
							className='text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
						>
							<FaYoutube className='size-5' />
						</Link>
					</div>

					<div className='mt-4 ml-2 text-neutral-500 dark:text-neutral-400'>
						© copyright Enkod {new Date().getFullYear()}
						. Усі права захищені.
					</div>
				</div>

				<div className='mt-10 grid grid-cols-2 items-start gap-10 sm:mt-0 md:mt-0 lg:grid-cols-3'>
					<div className='flex w-full flex-col justify-center gap-4'>
						<p className='font-bold text-neutral-600 transition-colors hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-white'>
							Сторінки
						</p>

						<ul className='flex list-none flex-col gap-4 text-neutral-600 transition-colors dark:text-neutral-300'>
							<li>
								<Link
									className='transition-colors hover:text-neutral-800 dark:hover:text-white'
									href={ROUTES.COURSES.ROOT}
								>
									Курси
								</Link>
							</li>
							<li>
								<Link
									className='transition-colors hover:text-neutral-800 dark:hover:text-white'
									href={ROUTES.ABOUT}
								>
									Про мене
								</Link>
							</li>
							<li>
								<Link
									className='transition-colors hover:text-neutral-800 dark:hover:text-white'
									href={ROUTES.SUBSCRIPTION}
								>
									Підписка
								</Link>
							</li>
						</ul>
					</div>

					<div className='flex flex-col justify-center gap-4'>
						<p className='font-bold text-neutral-600 transition-colors hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-white'>
							Соц. мережі
						</p>

						<ul className='flex list-none flex-col gap-4 text-neutral-600 transition-colors dark:text-neutral-300'>
							<li>
								<Link
									className='transition-colors hover:text-neutral-800 dark:hover:text-white'
									href='https://t.me/enkod_community'
									target='_blank'
									rel='noopener noreferrer'
								>
									Telegram
								</Link>
							</li>
							<li>
								<Link
									className='transition-colors hover:text-neutral-800 dark:hover:text-white'
									href='https://www.linkedin.com/in/artur-docenko'
									target='_blank'
									rel='noopener noreferrer'
								>
									LinkedIn
								</Link>
							</li>
							<li>
								<Link
									className='transition-colors hover:text-neutral-800 dark:hover:text-white'
									href='https://github.com/MikroTik3'
									target='_blank'
									rel='noopener noreferrer'
								>
									GitHub
								</Link>
							</li>
							<li>
								<Link
									className='transition-colors hover:text-neutral-800 dark:hover:text-white'
									href='/'
									target='_blank'
									rel='noopener noreferrer'
								>
									YouTube
								</Link>
							</li>
						</ul>
					</div>

					<div className='flex flex-col justify-center gap-4'>
						<p className='font-bold text-neutral-600 transition-colors hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-white'>
							Документи
						</p>

						<ul className='flex list-none flex-col gap-4 text-neutral-600 transition-colors dark:text-neutral-300'>
							<li>
								<Link
									className='transition-colors hover:text-neutral-800 dark:hover:text-white'
									href='/document/privacy-policy'
								>
									Політика конфіденційності
								</Link>
							</li>
							<li>
								<Link
									className='transition-colors hover:text-neutral-800 dark:hover:text-white'
									href='/document/terms-of-use'
								>
									Умови надання послуг
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div className='relative mt-20 h-[calc(clamp(3rem,18vw,20rem)*0.75)] w-full overflow-hidden'>
				<TextEffect text='ENKOD' />
			</div>
		</footer>
	)
}
