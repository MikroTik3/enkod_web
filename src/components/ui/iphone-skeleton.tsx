
'use client'

import { Easing, motion, useAnimate } from 'motion/react'
import React, { useImperativeHandle, useRef } from 'react'

import {
      Bookmark,
      MoreHorizontal,
      Share2,
      ThumbsDown,
      ThumbsUp
} from 'lucide-react'

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
                  <div className="relative mx-auto w-24">
                        <div className="absolute top-10 -left-[2px] flex flex-col gap-1.5">
                              <div className="h-2.5 w-[2px] rounded-l-sm bg-neutral-300 dark:bg-neutral-600" />
                              <div className="h-4 w-[2px] rounded-l-sm bg-neutral-300 dark:bg-neutral-600" />
                              <div className="h-4 w-[2px] rounded-l-sm bg-neutral-300 dark:bg-neutral-600" />
                        </div>

                        <div className="absolute top-14 -right-[2px]">
                              <div className="h-6 w-[2px] rounded-r-sm bg-neutral-300 dark:bg-neutral-700" />
                        </div>

                        <div className="rounded-[1.25rem] bg-neutral-200 p-1 shadow-sm ring-1 shadow-black/5 ring-black/5 dark:bg-neutral-700 dark:shadow-white/5 dark:ring-white/10">
                              <div className="relative h-40 w-full overflow-hidden rounded-[1rem] bg-white dark:bg-neutral-900">
                                    <motion.div
                                          variants={screenContentVariants}
                                          transition={CONTENT_TRANSITION}
                                          className="absolute inset-0"
                                    >
                                          <div className="mt-5 p-1">
                                                <div className="h-12 w-full overflow-hidden rounded-md border-[0.5px] border-neutral-200 dark:border-neutral-800">
                                                      <img
                                                            className="h-full w-full object-cover object-left"
                                                            src="http://res.cloudinary.com/terieyenike/image/upload/v1790176127/uploaded/2026-09-23%2018.08.37.jpg.jpg"
                                                            alt="course"
                                                      />
                                                </div>

                                                <div className="mt-0.5 whitespace-nowrap text-[3px] font-semibold text-gray-700 [mask-image:linear-gradient(to_right,rgba(0,0,0,1)_70%,rgba(0,0,0,0)_100%)] dark:text-gray-200">
                                                      Створюємо еб@ний ecommerce-shop з продажу пива
                                                </div>

                                                <div className="flex gap-0.5">
                                                      <div className="text-[2px] font-bold text-black dark:text-white">
                                                            @Enkod
                                                      </div>

                                                      <div className="text-[2px] font-medium text-gray-700 dark:text-gray-400">
                                                            125 позначок «Подобається» · 15 тис.
                                                      </div>
                                                </div>

                                                <div className="mt-1 flex items-center gap-[2px]">
                                                      <div className="size-2 overflow-hidden rounded-full border-[0.5px] border-neutral-200 dark:border-neutral-700">
                                                            <img
                                                                  src="/logo-dark.png"
                                                                  alt="enkod"
                                                            />
                                                      </div>

                                                      <button className="h-2 whitespace-normal rounded-md bg-red-600 px-1 text-[2px] font-semibold text-white transition-colors duration-200 hover:bg-red-700">
                                                            Підписатися
                                                      </button>

                                                      <div className="ml-auto flex items-center gap-[3px] text-neutral-700 dark:text-neutral-300">
                                                            <ThumbsUp className="size-[5px]" />
                                                            <ThumbsDown className="size-[5px]" />
                                                            <Share2 className="size-[5px]" />
                                                            <Bookmark className="size-[5px]" />
                                                            <MoreHorizontal className="size-[5px]" />
                                                      </div>
                                                </div>

                                                <div className="mt-1 w-full rounded-xs bg-gray-100 p-0.5 dark:bg-neutral-800">
                                                      <div className="flex gap-[0.5px] text-[2px] text-black dark:text-white">
                                                            Коментарі
                                                            <div className="text-[2px] text-gray-500 dark:text-gray-400">
                                                                  1,1 тис.
                                                            </div>
                                                      </div>

                                                      <div className="mt-0.5 flex items-center">
                                                            <div className="mr-0.5 size-1.5 overflow-hidden rounded-full border-[0.5px] border-neutral-200 dark:border-neutral-700">
                                                                  <img
                                                                        src="/logo-dark.png"
                                                                        alt="enkod"
                                                                  />
                                                            </div>

                                                            <input
                                                                  className="flex h-1.5 items-center rounded-full bg-gray-300 px-0.5 text-[2px] text-gray-900 outline-0 placeholder:text-[2px] placeholder:text-gray-500 dark:bg-neutral-700 dark:text-white dark:placeholder:text-gray-400"
                                                                  placeholder="Введіть текст коментаря"
                                                                  type="text"
                                                            />
                                                      </div>
                                                </div>
                                          </div>

                                          <div className="absolute inset-x-0 top-0 z-10">
                                                <IPhoneDynamicIsland
                                                      ref={dynamicIslandRef}
                                                />
                                          </div>
                                    </motion.div>
                              </div>
                        </div>

                        <div className="absolute inset-x-0 bottom-1.5 mx-auto h-0.5 w-8 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                  </div>
            </motion.div>
      )
}

function IPhoneDynamicIsland({
      ref
}: {
      ref: React.Ref<DynamicIslandHandle>
}) {
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
            <div className="flex w-full items-start justify-center pt-1.5">
                  <div
                        ref={scope}
                        className="relative overflow-hidden bg-black"
                        style={{ width: 28, height: 10, borderRadius: 5 }}
                  >
                        <div
                              id="iphone-idle"
                              className="absolute inset-0 flex items-center justify-center"
                              style={{ opacity: 1 }}
                        >
                              <div className="flex items-center gap-0.5">
                                    <div className="h-1 w-1 rounded-full bg-neutral-700" />
                                    <div className="h-0.5 w-0.5 rounded-full bg-neutral-600" />
                              </div>
                        </div>

                        <div
                              id="iphone-loading"
                              className="absolute inset-0 flex items-center justify-center"
                              style={{ opacity: 0 }}
                        >
                              <MiniLoadingDots />
                        </div>

                        <div
                              id="iphone-done"
                              className="absolute inset-0 flex items-center justify-center"
                              style={{ opacity: 0 }}
                        >
                              <span className="text-[3px] leading-none font-medium text-white">
                                    Connected
                              </span>
                        </div>
                  </div>
            </div>
      )
}

function MiniLoadingDots() {
      return (
            <div className="flex items-center gap-px">
                  <MiniLoadingDot delay={0} />
                  <MiniLoadingDot delay={0.1} />
                  <MiniLoadingDot delay={0.2} />
            </div>
      )
}

function MiniLoadingDot({ delay }: { delay: number }) {
      return (
            <motion.div
                  className="h-0.5 w-0.5 rounded-full bg-white"
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
