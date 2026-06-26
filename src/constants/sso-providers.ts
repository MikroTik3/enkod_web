import type { IconType } from 'react-icons'
import { FaDiscord, FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { RiTelegram2Fill } from 'react-icons/ri'

export interface SsoProviderMeta {
	id: string
	name: string
	description: string
	icon: IconType
	color?: string
}

export const SSO_PROVIDERS: Record<string, SsoProviderMeta> = {
	google: {
		id: 'google',
		name: 'Google',
		icon: FcGoogle,
		description: 'Налаштуйте вхід через Google для швидкої авторизації'
	},
	telegram: {
		id: 'telegram',
		name: 'Telegram',
		icon: RiTelegram2Fill,
		description:
			'Налаштуйте вхід через Telegram для швидкої авторизації',
		color: '#0088CC'
	},
	github: {
		id: 'github',
		name: 'Github',
		icon: FaGithub,
		description: 'Налаштуйте вхід через Github для авторизації в 1 клік'
	},
	discord: {
		id: 'discord',
		name: 'Discord',
		icon: FaDiscord,
		description:
			'Налаштуйте вхід через Discord для авторизації в 1 клік',
		color: '#5D6AF2'
	}
} as const
