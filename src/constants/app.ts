export const APP_CONFIG = {
	baseUrl: process.env.NEXT_PUBLIC_APP_URL ?? 'https://encod.com',
	apiUrl: process.env.NEXT_PUBLIC_API_URL ?? 'https://encod.com/api/v1'
} as const
