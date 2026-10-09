'use client'

import { AnimatedBeamPathIllustration } from "../ui/animated-path"
import { IPadSkeleton } from "../ui/ipad-skeleton"
import { IPhoneSkeleton } from "../ui/iphone-skeleton"
import { MacbookSkeleton } from "../ui/macbook-skeleton"

import { motion } from "motion/react"

export function FeaturesSecondary() {
      return (
            <section
                  id='features-secondary'
                  className='mx-auto max-w-335 px-4 py-10 md:px-8 md:py-20 lg:py-32'
            >
                  <div className='flex flex-col gap-5'>
                        <div className='flex flex-col items-center gap-2'>
                              <h2 className='text-2xl tracking-tight text-balance text-neutral-700 md:text-4xl lg:text-5xl dark:text-neutral-300'>
                                    Твій шлях у світ IT починається тут
                              </h2>
                              <p className='text-center text-sm text-neutral-600 md:text-base lg:text-lg dark:text-neutral-400'>
                                    Вивчай сучасні технології, опановуй програмування та перетворюй свої знання на реальні проєкти. <br className="hidden md:block" /> Навчайся у власному темпі та створюй майбутнє власноруч.
                              </p>
                        </div>

                        <div className="relative mx-auto mb-8 hidden h-12 w-full items-center lg:flex">
                              <div className="relative flex h-full w-full items-center">
                                    <div className="absolute top-1/2 left-[calc(100%/6)] z-10 -translate-x-1/2 -translate-y-1/2">
                                          <BeamCircle />
                                    </div>
                                    <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                                          <BeamCircle />
                                    </div>
                                    <div className="absolute top-1/2 left-[calc(500%/6)] z-10 -translate-x-1/2 -translate-y-1/2">
                                          <BeamCircle />
                                    </div>
                                    <div className="absolute top-1/2 left-[calc(100%/6)] w-[calc(200%/6)] -translate-y-1/2">
                                          <AnimatedBeamPathIllustration />
                                    </div>
                                    <div className="absolute top-1/2 left-[calc(300%/6)] w-[calc(200%/6)] -translate-y-1/2">
                                          <AnimatedBeamPathIllustration delay={1.4} />
                                    </div>
                              </div>
                        </div>

                        <div className="mx-auto grid w-full grid-cols-1 items-center gap-10 overflow-hidden py-4 md:grid-cols-3 md:flex-row md:items-end md:justify-center md:py-10">
                              <FeatureItem>
                                    <IPhoneSkeleton />
                                    <FeatureTitle>Навчайся будь-де</FeatureTitle>
                                    <FeatureDescription>
                                          Переглядай матеріали курсів, повторюй ключові концепції та навчайся навіть у дорозі.
                                    </FeatureDescription>
                              </FeatureItem>

                              <FeatureItem>
                                    <MacbookSkeleton />
                                    <FeatureTitle>Створюй реальні проєкти</FeatureTitle>
                                    <FeatureDescription>
                                         Пиши код, працюй із сучасними технологіями та закріплюй знання на практиці.
                                    </FeatureDescription>
                              </FeatureItem>

                              <FeatureItem>
                                    <IPadSkeleton />
                                    <FeatureTitle>Відстежуй свій прогрес</FeatureTitle>
                                    <FeatureDescription>
                                          Повертайся до навчальних матеріалів, переглядай виконані завдання та плануй наступні кроки.
                                    </FeatureDescription>
                              </FeatureItem>
                        </div>
                  </div>
            </section>
      )
}


function FeatureItem({ children }: { children: React.ReactNode }) {
      return (
            <motion.div
                  whileHover="animate"
                  initial="initial"
                  className="flex min-w-60 flex-col items-center"
            >
                  {children}
            </motion.div>
      );
}


function FeatureTitle({ children }: { children: React.ReactNode }) {
      return (
            <h3 className="mt-6 text-center text-base font-medium text-neutral-900 dark:text-neutral-100">
                  {children}
            </h3>
      );
}

function FeatureDescription({ children }: { children: React.ReactNode }) {
      return (
            <p className="mx-auto mt-2 max-w-xs text-center text-sm text-balance text-neutral-500 dark:text-neutral-400">
                  {children}
            </p>
      );
}


function BeamCircle() {
      return (
            <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800">
                  <div className="h-2 w-2 rounded-full bg-[#A577FF]" />
            </div>
      );
}