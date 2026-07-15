import { Card, CardContent } from '../../ui/card'

import { AppearanceForm } from './appearance'

export function Preferences() {
	return (
		<div className='flex flex-col gap-y-3'>
			<h2 className='text-[19px] font-medium'>Зовнішній вигляд</h2>

			<Card className='p-0 shadow-none'>
				<CardContent className='p-4'>
					<div className='space-y-8'>
						<AppearanceForm />
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
