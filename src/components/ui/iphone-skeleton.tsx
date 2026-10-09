'use client'
import { Easing, motion, useAnimate } from 'motion/react'
import Image from 'next/image'
import React, { useImperativeHandle, useRef } from 'react'
import { Avatar, AvatarImage } from './avatar'
import { Button } from './button'
import { Bookmark, MoreHorizontal, Share2, ThumbsDown, ThumbsUp } from 'lucide-react'

interface DynamicIslandHandle {
	start: () => void
	reset: () => void
}

const SPRING_OPTIONS = {
	type: 'spring' as const,
	stiffness: 500,
	damping: 40
}

export function IPhoneSkeleton() {
	const dynamicIslandRef = useRef<DynamicIslandHandle>(null)

	const screenContentVariants = {
		initial: { opacity: 0, filter: 'blur(8px)' },
		animate: { opacity: 1, filter: 'blur(0px)' }
	}

	const CONTENT_TRANSITION = {
		duration: 0.3,
		ease: 'easeOut' as Easing,
		delay: 0.2
	}

	return (
		<motion.div
			onHoverStart={() => dynamicIslandRef.current?.start()}
			onHoverEnd={() => dynamicIslandRef.current?.reset()}
		>
			<div className='relative mx-auto w-24'>
				<div className='absolute top-10 -left-[2px] flex flex-col gap-1.5'>
					<div className='h-2.5 w-[2px] rounded-l-sm bg-neutral-300' />
					<div className='h-4 w-[2px] rounded-l-sm bg-neutral-300' />
					<div className='h-4 w-[2px] rounded-l-sm bg-neutral-300' />
				</div>
				<div className='absolute top-14 -right-[2px]'>
					<div className='h-6 w-[2px] rounded-r-sm bg-neutral-300' />
				</div>

				<div className='rounded-[1.25rem] bg-neutral-200 p-1 shadow-sm ring-1 shadow-black/5 ring-black/5'>
					<div className='relative h-40 w-full overflow-hidden rounded-[1rem] bg-white'>
						<motion.div
							variants={screenContentVariants}
							transition={CONTENT_TRANSITION}
							className='absolute inset-0'
						>
							<div className='mt-5 p-1'>
								<div className="w-full h-12 border-[0.5px] overflow-hidden rounded-md">
									<img className="w-full h-full object-left object-cover" src="http://res.cloudinary.com/terieyenike/image/upload/v1790176127/uploaded/2026-09-23%2018.08.37.jpg.jpg" alt="course" />
								</div>

								<div className="text-[3px] whitespace-nowrap mt-0.5 font-semibold text-gray-700 [mask-image:linear-gradient(to_right,rgba(0,0,0,1)_70%,rgba(0,0,0,0)_100%)]">
									Створюємо еб@ний ecommerce-shop з продажу пива
								</div>

								<div className="flex gap-0.5"> 
									<div className="text-[2px] font-bold text-black"> 
										@Enkod 
									</div> 
									<div className="text-[2px] font-medium text-gray-700">
										125 позначок «Подобається» · 15 тис.
									</div> 
								</div>

								<div className="flex items-center gap-[2px] mt-1">
									<div className="size-2 border-[0.5px] rounded-full overflow-hidden"> 
										<img src="/logo-dark.png" alt="enkod" />
									</div>

									<button className="px-1 h-2 text-[2px] whitespace-normal font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors duration-200">
										Підписатися
									</button>
									
									<div className="flex items-center gap-[3px] ml-auto"> 
										<ThumbsUp className="size-[5px]" /> 
										<ThumbsDown className="size-[5px]" /> 
										<Share2 className="size-[5px]" /> 
										<Bookmark className="size-[5px]" /> 
										<MoreHorizontal className="size-[5px]" />
									</div>

								</div>

								<div className="w-full bg-gray-100 rounded-xs p-0.5 mt-1">
									<div className="text-[2px] flex gap-[0.5px] text-black">Коментарі <div className="text-[2px] text-gray-500">1,1 тис.</div></div>
									
									<div className="flex items-center mt-0.5">
										<div className="size-1.5 border-[0.5px] mr-0.5 rounded-full overflow-hidden"> 
											<img src="/logo-dark.png" alt="enkod" />
										</div>

										<input 
											className="bg-gray-300 h-1.5 flex items-center px-0.5 rounded-full text-[2px] placeholder:text-[2px] placeholder:text-gray-500 outline-0" 
											placeholder="Введіть текст коментаря" 
											type="text" 
										/>
									</div>
								</div>
							</div>

							<div className='absolute inset-x-0 top-0 z-10'>
								<IPhoneDynamicIsland
									ref={dynamicIslandRef}
								/>
							</div>
						</motion.div>
					</div>
				</div>
				<div className='absolute inset-x-0 bottom-1.5 mx-auto h-0.5 w-8 rounded-full bg-neutral-400' />
			</div>
		</motion.div>
	)
}

function IPhoneDynamicIsland({ ref }: { ref: React.Ref<DynamicIslandHandle> }) {
	const [scope, animate] = useAnimate()
	const hasAnimatedRef = useRef(false)

	const reset = () => {
		hasAnimatedRef.current = false
		animate(
			scope.current,
			{ width: 28, height: 10, borderRadius: 5 },
			SPRING_OPTIONS
		)
		animate('#iphone-idle', { opacity: 1 }, { duration: 0.15 })
		animate('#iphone-loading', { opacity: 0 }, { duration: 0.1 })
		animate('#iphone-done', { opacity: 0 }, { duration: 0.1 })
	}

	const start = async () => {
		if (hasAnimatedRef.current) return
		hasAnimatedRef.current = true

		await animate('#iphone-idle', { opacity: 0 }, { duration: 0.1 })
		animate(
			scope.current,
			{ width: 16, height: 10, borderRadius: 5 },
			SPRING_OPTIONS
		)
		await animate('#iphone-loading', { opacity: 1 }, { duration: 0.15 })
		await new Promise(r => setTimeout(r, 1000))
		await animate('#iphone-loading', { opacity: 0 }, { duration: 0.1 })
		animate(
			scope.current,
			{ width: 40, height: 10, borderRadius: 5 },
			SPRING_OPTIONS
		)
		await animate(
			'#iphone-done',
			{ opacity: 1 },
			{ duration: 0.15, delay: 0.1 }
		)
	}

	useImperativeHandle(ref, () => ({ start, reset }))

	return (
		<div className='flex w-full items-start justify-center pt-1.5'>
			<div
				ref={scope}
				className='relative overflow-hidden bg-black'
				style={{ width: 28, height: 10, borderRadius: 5 }}
			>
				<div
					id='iphone-idle'
					className='absolute inset-0 flex items-center justify-center'
					style={{ opacity: 1 }}
				>
					<div className='flex items-center gap-0.5'>
						<div className='h-1 w-1 rounded-full bg-neutral-700' />
						<div className='h-0.5 w-0.5 rounded-full bg-neutral-600' />
					</div>
				</div>
				<div
					id='iphone-loading'
					className='absolute inset-0 flex items-center justify-center'
					style={{ opacity: 0 }}
				>
					<MiniLoadingDots />
				</div>
				<div
					id='iphone-done'
					className='absolute inset-0 flex items-center justify-center'
					style={{ opacity: 0 }}
				>
					<span className='text-[3px] leading-none font-medium text-white'>
						Connected
					</span>
				</div>
			</div>
		</div>
	)
}

function MiniLoadingDots() {
	return (
		<div className='flex items-center gap-px'>
			<MiniLoadingDot delay={0} />
			<MiniLoadingDot delay={0.1} />
			<MiniLoadingDot delay={0.2} />
		</div>
	)
}

function MiniLoadingDot({ delay }: { delay: number }) {
	return (
		<motion.div
			className='h-0.5 w-0.5 rounded-full bg-white'
			animate={{ opacity: [0.3, 1, 0.3] }}
			transition={{
				duration: 0.6,
				repeat: Infinity,
				delay,
				ease: 'easeInOut'
			}}
		/>
	)
}
