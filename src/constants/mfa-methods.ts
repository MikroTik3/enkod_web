import { KeyIcon, ShieldIcon, SmartphoneIcon } from 'lucide-react'
import type { ComponentType } from 'react'

export type MfaMethod = 'totp' | 'passkey' | 'recovery'

export interface MfaOption {
	id: MfaMethod
	name: string
	description: string
	icon: ComponentType<{ className?: string }>
}

export const MFA_OPTIONS: MfaOption[] = [
	{
		id: 'totp',
		name: 'Додаток-аутентифікатор',
		description: 'Коди з додатка на телефоні',
		icon: SmartphoneIcon
	},
	{
		id: 'passkey',
		name: 'Passkey',
		description: 'Біометрія або ключ доступу',
		icon: KeyIcon
	},
	{
		id: 'recovery',
		name: 'Резервний код',
		description: 'Використовуйте одноразові запасні коди',
		icon: ShieldIcon
	}
]
