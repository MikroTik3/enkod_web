import { KeyRound, ListOrdered, Mail, Smartphone } from 'lucide-react'

import { Badge } from '../../ui/badge'
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
			<h2 className='text-[19px] font-medium'>
				Багатофакторна автентифікація
			</h2>
			<Card className='py-0 shadow-none'>
				<CardContent className='p-4'>
					<div className='space-y-8'>
						<div className='flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0'>
							<div className='mr-5 flex items-start gap-x-4 md:items-center'>
								<div className='hidden rounded-full bg-blue-600 p-2.5 md:flex'>
									<Smartphone className='size-5 stroke-[1.7px] text-white' />
								</div>
								<div className='w-full'>
									<div className='mb-1 flex flex-col items-start gap-2 sm:flex-row sm:items-center'>
										<h2 className='font-semibold'>
											Додаток для
											аутентифікації
										</h2>
										{status?.totpMfa ? (
											<Badge variant='success'>
												Включено
											</Badge>
										) : (
											<Badge variant='error'>
												Вимкнено
											</Badge>
										)}
									</div>
									<p className='text-muted-foreground text-sm'>
										{status?.totpMfa
											? 'Двофакторна аутентифікація через TOTP увімкнена. Для входу в обліковий запис використовуйте додаток-аутентифікатор, щоб отримати код.'
											: 'Забезпечте безпеку свого облікового запису за допомогою двофакторної автентифікації через TOTP.'}
									</p>
								</div>
							</div>
							<div>
								{status?.totpMfa ? (
									<DisableTotpForm />
								) : (
									<EnableTotpForm />
								)}
							</div>
						</div>

						<div className='flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0'>
							<div className='mr-5 flex items-start gap-x-4 md:items-center'>
								<div className='hidden rounded-full bg-blue-600 p-2.5 md:flex'>
									<KeyRound className='size-5 stroke-[1.7px] text-white' />
								</div>
								<div className='w-full'>
									<div className='mb-1 flex flex-col items-start gap-2 sm:flex-row sm:items-center'>
										<h2 className='font-semibold'>
											Ключі доступу
										</h2>
										{/* {status?.passkeyMfa ? (
											<Badge variant='success'>
												Включено
											</Badge>
										) : (
											<Badge variant='error'>
												Вимкнено
											</Badge>
										)} */}
									</div>
									<p className='text-muted-foreground text-sm'>
										{status?.passkeyMfa
											? 'Ключ доступу додано як другий фактор. Ви можете використовувати його для підтвердження входу.'
											: 'Додайте ключ доступу, щоб підвищити рівень захисту облікового запису.'}
									</p>
								</div>
							</div>
							<div className='flex gap-3'>
								{status?.passkeyMfa && (
									<PasskeyModal />
								)}
								<RegisterPasskeyForm />
							</div>
						</div>

						{status?.recoveryActive && (
							<div className='flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0'>
								<div className='mr-5 flex items-center gap-x-4'>
									<div className='hidden rounded-full bg-blue-600 p-2.5 md:flex'>
										<ListOrdered className='size-5 stroke-[1.7px] text-white' />
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
		</div>
	)
}
