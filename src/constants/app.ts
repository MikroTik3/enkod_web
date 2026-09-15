export const APP_CONFIG = {
	baseUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://enkod.top',
	apiUrl: process.env.NEXT_PUBLIC_API_URL || 'https://api.enkod.top/api/v1'
} as const