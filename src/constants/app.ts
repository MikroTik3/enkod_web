export const APP_CONFIG = {
	baseUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://encod.top',
	apiUrl: process.env.NEXT_PUBLIC_API_URL || 'https://api.encod.top/api/v1'
} as const