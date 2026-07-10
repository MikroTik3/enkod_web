export const env = {
	NODE_ENV: process.env.NODE_ENV ?? 'production',

	APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? 'https://encod.com',
	API_URL: process.env.NEXT_PUBLIC_API_URL ?? 'https://api.encod.com',

	NEXT_PUBLIC_COOKIES_DOMAIN: process.env.NEXT_PUBLIC_COOKIES_DOMAIN ?? 'encod.com',

	TURNSTILE_SITE_KEY:
		process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ??
		'0x4AAAAAABCT1vfLsRGDrvdo',
	FPJS_API_KEY:
		process.env.NEXT_PUBLIC_FPJS_API_KEY ?? '7wb2b5FhlpsSLPaAKf3Y',
	FPJS_ENDPOINT:
		process.env.NEXT_PUBLIC_FPJS_ENDPOINT ?? 'https://idp.encod.com',
	GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? ''
} as const
