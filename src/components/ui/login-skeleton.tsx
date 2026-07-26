'use client'
import Image from 'next/image'
import React from 'react'
import { FaDiscord, FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { RiTelegram2Fill } from 'react-icons/ri'

import { cn } from '@/lib/utils'

import { GridLineHorizontal, GridLineVertical } from './grid-lines'

export function LoginSkeleton({ className }: { className?: string }) {
	return (
		<div className='h-full w-full mask-b-from-50% p-4 md:p-8'>
			<div className={cn('relative', className)}>
				<GridLineHorizontal className='top-0' offset='40px' />
				<GridLineHorizontal
					className='top-auto bottom-0'
					offset='40px'
				/>
				<GridLineVertical className='left-0' offset='40px' />
				<GridLineVertical
					className='right-0 left-auto'
					offset='40px'
				/>

				<div className='w-full px-6 py-6'>
					<div className='flex flex-col items-center gap-4'>
						<LoginLogo />

						<div className='flex w-full flex-col gap-3'>
							<div className='flex flex-col gap-1'>
								<label
									htmlFor='skeleton-email'
									className='text-[8px] font-medium text-neutral-300'
								>
									Пошта
								</label>

								<input
									id='skeleton-email'
									name='skeleton-demo-email'
									type='text'
									autoComplete='one-time-code'
									data-form-type='other'
									placeholder='you@example.com'
									className='w-full rounded-md bg-white border dark:bg-neutral-900 px-2 py-1.5 text-[8px] text-neutral-200 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset] ring-1 ring-white dark:ring-white/10 outline-none placeholder:text-neutral-500 focus:ring-2 focus:ring-neutral-500'
								/>
							</div>

							<div className='flex flex-col gap-1'>
								<label
									htmlFor='skeleton-password'
									className='text-[8px] font-medium text-neutral-300'
								>
									Пароль
								</label>

								<input
									id='skeleton-password'
									type='password'
									autoComplete='new-password'
									data-form-type='other'
									placeholder='••••••••'
									className='w-full rounded-md bg-white border dark:bg-neutral-900 px-2 py-1.5 text-[8px] text-neutral-200 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset] ring-1 ring-white dark:ring-white/10 outline-none placeholder:text-neutral-500 focus:ring-2 focus:ring-neutral-500'
								/>
							</div>

							<div className='flex items-center justify-between'>
								<label className='flex cursor-pointer items-center gap-1.5'>
									<input
										type='checkbox'
										className='size-3 cursor-pointer rounded border border-neutral-700 bg-neutral-900 accent-white transition-colors'
									/>

									<span className='text-[7px] text-neutral-400'>
										Запам'ятати мене
									</span>
								</label>

								<button
									type='button'
									className='text-[7px] text-neutral-500 transition-colors hover:text-neutral-300'
								>
									Забули пароль?
								</button>
							</div>
							<button
								type='button'
								className='w-full rounded-md bg-linear-to-b from-neutral-700 to-neutral-950 px-3 py-2 text-center text-[8px] font-semibold text-white transition-all hover:from-neutral-600 hover:to-neutral-900 active:scale-[0.98]'
								style={{
									boxShadow:
										'0 2px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
								}}
							>
								Увiйти
							</button>

							<div className='flex items-center gap-2'>
								<div className='h-px flex-1 bg-neutral-200' />
								<span className='text-[7px] text-neutral-400'>
									Або продовжити
								</span>
								<div className='h-px flex-1 bg-neutral-200' />
							</div>

							<div className='flex gap-2'>
								<button
									type='button'
									className='flex flex-1 items-center justify-center gap-1 rounded-md border bg-white py-1.5 shadow-sm ring-1 shadow-black/5 ring-black/10 transition-all hover:bg-neutral-50 active:scale-[0.98] dark:bg-neutral-900'
								>
									<FcGoogle className='size-2.5' />
								</button>
								<button
									type='button'
									className='flex flex-1 items-center justify-center gap-1 rounded-md border bg-white py-1.5 shadow-sm ring-1 shadow-black/5 ring-black/10 transition-all hover:bg-neutral-50 active:scale-[0.98] dark:bg-neutral-900'
								>
									<FaDiscord className='size-2.5 fill-[#5D6AF2]' />
								</button>
								<button
									type='button'
									className='flex flex-1 items-center justify-center gap-1 rounded-md border bg-white py-1.5 shadow-sm ring-1 shadow-black/5 ring-black/10 transition-all hover:bg-neutral-50 active:scale-[0.98] dark:bg-neutral-900'
								>
									<FaGithub className='size-2.5' />
								</button>
								<button
									type='button'
									className='flex flex-1 items-center justify-center gap-1 rounded-md border bg-white py-1.5 shadow-sm ring-1 shadow-black/5 ring-black/10 transition-all hover:bg-neutral-50 active:scale-[0.98] dark:bg-neutral-900'
								>
									<RiTelegram2Fill className='size-2.5 fill-[#0088CC]' />
								</button>
							</div>

							<p className='text-center text-[7px] text-neutral-500 dark:text-neutral-400'>
								У вас ще немає облікового
								запису?{' '}
								<button
									type='button'
									className='font-medium text-neutral-200 transition-colors hover:text-neutral-50'
								>
									Зареєструватися
								</button>
							</p>
						</div>

						<TestimonialCard />
					</div>
				</div>
			</div>
		</div>
	)
}

function TestimonialCard() {
	return (
		<div className='mt-2 w-full rounded-xl bg-white p-4 shadow-lg ring-1 ring-black/5 dark:bg-zinc-950'>
			<p className='text-xs leading-relaxed text-neutral-600 dark:text-neutral-200'>
				Завдяки цій платформі я створив свій перший повноцінний
				вебзастосунок уже через кілька тижнів навчання. Уроки
				зрозумілі, багато практики та підтримка спільноти
				допомагають швидко прогресувати.
			</p>
			<div className='mt-3 flex items-center gap-2'>
				<Image
					src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWgSutbzzG1AHPDEMdqZZ-vSKY26kSo2Xwjg&s'
					alt='Дiма Михно'
					width={20}
					height={20}
					className='size-5 rounded-full object-cover'
				/>
				<div className='flex flex-col'>
					<span className='text-[10px] font-medium text-neutral-800 dark:text-neutral-200'>
						Дiма Михно
					</span>
					<span className='text-[8px] text-neutral-500 dark:text-neutral-50'>
						Маленький єнвелопер
					</span>
				</div>
			</div>
		</div>
	)
}

function LoginLogo() {
	return (
		<a href='#' className='flex items-center gap-1.5'>
			<div className='relative flex size-5 items-center justify-center rounded-md'>
				<Image
					src='/logo-dark.png'
					height={20}
					width={20}
					alt='Logo'
				/>
			</div>
			<span className='text-xs font-semibold text-neutral-900'>
				Enkod
			</span>
		</a>
	)
}
