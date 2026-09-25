import { KeyRound, ListOrdered, Smartphone } from 'lucide-react'

import { Card, CardContent } from '../../ui/card'

import { DisableTotpForm } from './disable-totp-form'
import { EnableTotpForm } from './enable-totp-form'
import { PasskeyModal } from './passkey-modal'
import { RecoveryCodesModal } from './recovery-codes-modal'
import { RegisterPasskeyForm } from './register-passkey-form'
import type { MfaStatusResponse } from '@/api/generated'

interface TwoFactorAuthFormProps {
	status: MfaStatusResponse | undefined
}

export function TwoStepAuthForm({ status }: TwoFactorAuthFormProps) {
	return (
		<div className='flex flex-col gap-y-3'>
			<Card className='py-0 rounded-4xl shadow-none'>
				<CardContent className='p-0'>
					<div className='divide-y divide-border'>
						<div className='relative flex gap-4 hover:bg-gray-100 dark:hover:bg-accent px-4 py-2 items-center justify-between'>
							<div className='flex gap-x-2 items-center'>
								<div className='relative flex aspect-square items-center justify-center rounded-sm align-middle shadow-lg ring-1 ring-white/20 ring-offset-2 ring-inset size-7 bg-linear-to-b from-orange-400 to-orange-600 ring-offset-orange-500'>
									<Smartphone className='size-4 text-white' />
								</div>
								<h2>
									Аутентифікатор
								</h2>
							</div>
							<div>
								{status?.totpMfa ? (
									<DisableTotpForm />
								) : (
									<EnableTotpForm />
								)}
							</div>
						</div>

						<div className='flex gap-4 hover:bg-gray-100 dark:hover:bg-accent px-4 py-2 items-center justify-between'>
							<div className='flex gap-x-2 items-center'>
								<div className='relative flex aspect-square items-center justify-center rounded-sm align-middle shadow-lg ring-1 ring-white/20 ring-offset-2 ring-inset size-7 bg-linear-to-b from-green-400 to-green-600 ring-offset-green-500'>
									<KeyRound className='size-4 text-white' />
								</div>
								<h2>
									Ключі доступу
								</h2>
							</div>
							<div className='flex gap-3'>
								{status?.passkeyMfa && (
									<PasskeyModal />
								)}
								<RegisterPasskeyForm />
							</div>
						</div>

						{status?.recoveryActive && (
							<div className='flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between md:gap-0'>
								<div className='mr-5 flex items-center gap-x-4'>
									<div className='flex size-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white'>
										<ListOrdered className='size-[18px] stroke-[1.7px]' />
									</div>
									<div className='flex w-full flex-col'>
										<h2 className='font-semibold'>
											Коди
											відновлення
										</h2>
										<p className='text-muted-foreground text-sm'>
											Ви можете
											використовувати
											коди
											відновлення
											для доступу до
											облікового
											запису, якщо
											втратите
											доступ до
											своєму
											пристрою.
										</p>
									</div>
								</div>
								<div>
									<RecoveryCodesModal />
								</div>
							</div>
						)}
					</div>
				</CardContent>
			</Card>
			<p className='px-1 text-sm leading-5 text-muted-foreground'>
				Захистіть свій обліковий запис за допомогою додаткового способу
				підтвердження входу. Використовуйте додаток для аутентифікації,
				ключ доступу або коди відновлення.
			</p>
		</div>
	)
}