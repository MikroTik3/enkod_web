import { ChartColumn, Puzzle, Zap } from 'lucide-react'

import { ChatConversation } from '../ui/chat'
import { KeyboardSkeleton } from '../ui/keyboard-skeleton'
import { LoginSkeleton } from '../ui/login-skeleton'
import { MarqueeLanguagesSkeleton } from '../ui/marquee-languages-skeleton'
import { VerticalPulseLines } from '../ui/vertical-pulse-lines'
import { WorldMapSkeleton } from '../ui/world-map-skeleton'

export function Features() {
	return (
		<section
			id='features'
			className='mx-auto max-w-335 px-4 py-10 md:px-8 md:py-20 lg:py-32'
		>
			<div className='flex flex-col gap-5'>
				<div className='flex flex-col items-center gap-2'>
					<h2 className='text-2xl tracking-tight text-balance text-neutral-700 md:text-4xl lg:text-5xl dark:text-neutral-300'>
						Простий старт навчання
					</h2>
					<p className='text-center text-sm text-neutral-600 md:text-base lg:text-lg dark:text-neutral-400'>
						Почніть навчання за кілька хвилин. Створіть
						обліковий запис, оберіть курс і{' '}
						<br className='hidden md:block' /> одразу
						переходьте до практики.
					</p>
				</div>

				<div className='mx-auto mt-8 grid grid-cols-1 gap-4 md:mt-12 md:grid-cols-3 md:grid-rows-2'>
					<div className='rounded-2xl bg-white shadow-sm ring-1 shadow-black/10 ring-black/10 md:row-span-2 dark:bg-neutral-900 dark:shadow-white/5 dark:ring-white/10'>
						<div className='flex h-full flex-col'>
							<div className='flex flex-col gap-2 p-6'>
								<h3 className='text-sm font-semibold text-neutral-900 dark:text-white'>
									Просте налаштування
									авторизації
								</h3>
								<p className='text-sm text-balance text-neutral-600 dark:text-neutral-400'>
									Почніть роботу за лічені
									хвилини завдяки нашій
									простій процедурі
									аутентифікації.
								</p>
							</div>

							<div className='mt-auto flex flex-1 items-center justify-center overflow-hidden pt-4'>
								<LoginSkeleton />
							</div>
						</div>
					</div>

					<div className='rounded-2xl bg-white shadow-sm ring-1 shadow-black/10 ring-black/10 dark:bg-neutral-900 dark:shadow-white/5 dark:ring-white/10'>
						<div className='flex h-full flex-col'>
							<div className='flex flex-col gap-2 p-6'>
								<h3 className='text-sm font-semibold text-neutral-900 dark:text-white'>
									Спільнота жівчиків по
									всьому світу
								</h3>
								<p className='text-sm text-balance text-neutral-600 dark:text-neutral-400'>
									Навчайтеся разом з іншими
									студентами, обмінюйтеся
									досвідом, знаходьте
									однодумців та розвивайтеся
									в спільноті
									веброзробників.
								</p>
							</div>

							<WorldMapSkeleton />
						</div>
					</div>

					<div className='overflow-hidden rounded-2xl bg-white shadow-sm ring-1 shadow-black/10 ring-black/10 md:row-span-2 dark:bg-neutral-900 dark:shadow-white/5 dark:ring-white/10'>
						<div className='flex h-full flex-col'>
							<div className='flex flex-col gap-2 p-6'>
								<h3 className='text-sm font-semibold text-neutral-900 dark:text-white'>
									Просте налаштування
									авторизації
								</h3>
								<p className='text-sm text-balance text-neutral-600 dark:text-neutral-400'>
									Почніть роботу за лічені
									хвилини завдяки нашій
									простій процедурі
									аутентифікації.
								</p>
							</div>

							<div className='mt-auto flex flex-1 flex-col items-center justify-between gap-2 overflow-hidden pt-4'>
								<ChatConversation />

								<div className='relative flex h-24 w-full shrink-0 items-center justify-center gap-6 overflow-hidden px-8'>
									<VerticalPulseLines />
								</div>

								<div className='pb-6'>
									<MarqueeLanguagesSkeleton />
								</div>
							</div>
						</div>
					</div>

					<div className='overflow-hidden rounded-2xl bg-white shadow-sm ring-1 shadow-black/10 ring-black/10 dark:bg-neutral-900 dark:shadow-white/5 dark:ring-white/10'>
						<div className='flex h-full flex-col'>
							<div className='flex flex-col gap-2 p-6'>
								<h3 className='text-sm font-semibold text-neutral-900 dark:text-white'>
									Пиши код щодня
								</h3>
								<p className='text-sm text-balance text-neutral-600 dark:text-neutral-400'>
									Формуйте навичку
									програмування через
									постійну практику та
									реальні приклади.
								</p>
							</div>

							<div className='mt-auto flex flex-1 items-center justify-center overflow-hidden mask-r-from-50% pt-4'>
								<KeyboardSkeleton />
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='mx-auto mt-4 grid grid-cols-1 gap-4 md:mt-12 md:grid-cols-3'>
				<div className='group bg-accent rounded-2xl p-6 dark:bg-neutral-900'>
					<Zap className='size-5 transition-all duration-300 group-hover:translate-x-2' />
					<h3 className='mt-4 text-sm font-semibold text-neutral-900 dark:text-white'>
						Швидкий старт навчання
					</h3>
					<p className='mt-2 text-sm text-balance text-neutral-600 dark:text-neutral-400'>
						Почніть навчання одразу без складних
						налаштувань. Усе вже підготовлено: уроки,
						практика та проєкти доступні з першого дня.
					</p>
				</div>
				<div className='group bg-accent rounded-2xl p-6 dark:bg-neutral-900'>
					<ChartColumn className='size-5 transition-all duration-300 group-hover:translate-x-2' />
					<h3 className='mt-4 text-sm font-semibold text-neutral-900 dark:text-white'>
						Відстеження прогресу
					</h3>
					<p className='mt-2 text-sm text-balance text-neutral-600 dark:text-neutral-400'>
						Слідкуйте за своїм прогресом у навчанні:
						виконані завдання, пройдені модулі та
						реальні навички, які ви отримуєте.
					</p>
				</div>
				<div className='group bg-accent rounded-2xl p-6 dark:bg-neutral-900'>
					<Puzzle className='size-5 transition-all duration-300 group-hover:translate-x-2' />
					<h3 className='mt-4 text-sm font-semibold text-neutral-900 dark:text-white'>
						Практика на реальних завданнях
					</h3>
					<p className='mt-2 text-sm text-balance text-neutral-600 dark:text-neutral-400'>
						Закріплюйте знання через практичні завдання
						та проєкти, максимально наближені до
						реальних задач у розробці.
					</p>
				</div>
			</div>
		</section>
	)
}
