'use client'

export function FeaturesSecondary() {
      return (
            <section
			id='features-secondary'
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

                        <div className='mt-8 grid grid-cols-1 gap-4 md:mt-12 md:grid-cols-2'>
                              <div className='bg-accent h-100 rounded-2xl'>
                              </div>

                              <div className='bg-accent h-100 rounded-2xl'>
                              </div>
                        </div>

                        <div className='bg-accent h-100 rounded-2xl w-full'>

                        </div>
                  </div>
            </section>
      )
}