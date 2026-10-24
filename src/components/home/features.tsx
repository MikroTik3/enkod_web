import { ChartColumn, Puzzle, Zap } from 'lucide-react'

import { ChatConversation } from '../ui/chat'
import { KeyboardSkeleton } from '../ui/keyboard-skeleton'
import { LoginSkeleton } from '../ui/login-skeleton'
import { MarqueeLanguagesSkeleton } from '../ui/marquee-languages-skeleton'
import { VerticalPulseLines } from '../ui/vertical-pulse-lines'
import { WorldMapSkeleton } from '../ui/world-map-skeleton'

const card =
	'overflow-hidden rounded-2xl bg-white shadow-sm ring-1 shadow-black/10 ring-black/10 dark:bg-neutral-900 dark:shadow-white/5 dark:ring-white/10'
const cardHead = 'flex flex-col gap-2 p-6 md:p-7 lg:p-6'
const cardTitle =
	'text-sm font-semibold text-neutral-900 md:text-base dark:text-white'
const cardText =
	'text-sm text-balance text-neutral-600 md:text-[15px] md:leading-relaxed dark:text-neutral-400'

export function Features() {
	return (
		<section
			id='features'
			className='mx-auto max-w-335 px-4 py-10 md:px-8 md:py-16 lg:py-32'
		>
			<div className='flex flex-col gap-5'>
				<div className='flex flex-col items-center gap-2 md:gap-3'>
					<h2 className='text-center text-2xl tracking-tight text-balance text-neutral-700 md:text-4xl lg:text-5xl dark:text-neutral-300'>
						Простий старт навчання
					</h2>
					<p className='max-w-xl text-center text-sm text-balance text-neutral-600 md:max-w-2xl md:text-base lg:max-w-none lg:text-lg dark:text-neutral-400'>
						Почніть навчання за кілька хвилин. Створіть
						обліковий запис, оберіть курс і{' '}
						<br className='hidden lg:block' /> одразу
						переходьте до практики.
					</p>
				</div>

				<div className='mx-auto mt-8 grid w-full grid-cols-1 gap-4 md:mt-10 md:grid-flow-dense md:grid-cols-2 md:gap-5 lg:mt-12 lg:grid-cols-3 lg:grid-rows-2 lg:gap-4'>
					{/* Логін: на планшеті займає 2 рядки зліва */}
					<div className={`${card} md:row-span-2`}>
						<div className='flex h-full flex-col'>
							<div className={cardHead}>
								<h3 className={cardTitle}>
									Просте налаштування
									авторизації
								</h3>
								<p className={cardText}>
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

					{/* Спільнота */}
					<div className={card}>
						<div className='flex h-full flex-col'>
							<div className={cardHead}>
								<h3 className={cardTitle}>
									Спільнота жівчиків по
									всьому світу
								</h3>
								<p className={cardText}>
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

					{/* Чат: на планшеті на всю ширину, на lg висока колонка справа */}
					<div
						className={`${card} md:col-span-2 lg:col-span-1 lg:row-span-2`}
					>
						<div className='flex h-full flex-col'>
							<div className={cardHead}>
								<h3 className={cardTitle}>
									Живе спілкування та
									підтримка
								</h3>
								<p className={cardText}>
									Ставте запитання, діліться
									прогресом і отримуйте
									відповіді від менторів та
									інших студентів.
								</p>
							</div>

							<div className='mt-auto flex min-w-0 flex-1 flex-col items-center justify-between gap-2 overflow-hidden pt-4 md:gap-4 md:pt-2 lg:gap-2 lg:pt-4'>
								<div className='flex w-full justify-center md:px-7 lg:px-0'>
									<div className='w-full md:max-w-xl lg:max-w-none'>
										<ChatConversation />
									</div>
								</div>

								<div className='relative flex h-24 w-full shrink-0 items-center justify-center gap-6 overflow-hidden px-8 md:h-16 lg:h-24'>
									<VerticalPulseLines />
								</div>

								<div className='w-full min-w-0 overflow-hidden mask-x-from-85% pb-6 md:pb-7 lg:pb-6'>
									<MarqueeLanguagesSkeleton />
								</div>
							</div>
						</div>
					</div>

					{/* Клавіатура */}
					<div className={card}>
						<div className='flex h-full flex-col'>
							<div className={cardHead}>
								<h3 className={cardTitle}>
									Пиши код щодня
								</h3>
								<p className={cardText}>
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

			<div className='mx-auto mt-4 grid grid-cols-1 gap-4 md:mt-5 md:grid-cols-2 md:gap-5 lg:mt-12 lg:grid-cols-3 lg:gap-4'>
				<div className='group bg-accent rounded-2xl p-6 md:p-7 lg:p-6 dark:bg-neutral-900'>
					<Zap className='size-5 transition-all duration-300 group-hover:translate-x-2' />
					<h3 className={`mt-4 ${cardTitle}`}>
						Швидкий старт навчання
					</h3>
					<p className={`mt-2 ${cardText}`}>
						Почніть навчання одразу без складних
						налаштувань. Усе вже підготовлено: уроки,
						практика та проєкти доступні з першого дня.
					</p>
				</div>

				<div className='group bg-accent rounded-2xl p-6 md:p-7 lg:p-6 dark:bg-neutral-900'>
					<ChartColumn className='size-5 transition-all duration-300 group-hover:translate-x-2' />
					<h3 className={`mt-4 ${cardTitle}`}>
						Відстеження прогресу
					</h3>
					<p className={`mt-2 ${cardText}`}>
						Слідкуйте за своїм прогресом у навчанні:
						виконані завдання, пройдені модулі та
						реальні навички, які ви отримуєте.
					</p>
				</div>

				<div className='group bg-accent rounded-2xl p-6 md:col-span-2 md:p-7 lg:col-span-1 lg:p-6 dark:bg-neutral-900'>
					<Puzzle className='size-5 transition-all duration-300 group-hover:translate-x-2' />
					<h3 className={`mt-4 ${cardTitle}`}>
						Практика на реальних завданнях
					</h3>
					<p className={`mt-2 ${cardText} md:max-w-xl`}>
						Закріплюйте знання через практичні завдання
						та проєкти, максимально наближені до
						реальних задач у розробці.
					</p>
				</div>
			</div>
		</section>
	)
}
