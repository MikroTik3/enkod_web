import { AppearanceForm } from './appearance'

export function Preferences() {
	return (
		<div className='mx-auto flex w-full max-w-xl flex-col gap-y-4 pb-10'>
			<h2 className='text-lg text-center font-medium'>Зовнішній вигляд</h2>

			<div className='flex flex-col gap-3'>
				<h3 className='px-1 text-xs font-medium tracking-wider text-muted-foreground uppercase'>
					Тема оформлення
				</h3>

				<AppearanceForm />

				<p className='px-1 text-sm text-muted-foreground'>
					Автоматичне перемикання тем дозволяє переходити між світлою та темною темами залежно від режиму дисплея вашого пристрою.
				</p>
			</div>
		</div>
	)
}