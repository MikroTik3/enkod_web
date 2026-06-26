import type { Route } from 'next'

export const ROUTES = {
	HOME: '/' as Route,
	ABOUT: '/about' as Route,

	COURSES: {
		ROOT: '/courses',
		SINGLE: (slug: string) => `/courses/${slug}` as any,
		LESSON: (id: string) => `/lesson/${id}` as any
	},
	SUBSCRIPTION: '/subscription' as Route,

	AUTH: {
		LOGIN: (redirectTo?: string) =>
			(redirectTo
				? `/auth/login?redirectTo=${redirectTo}`
				: '/auth/login') as Route,

		REGISTER: '/auth/register' as Route,
		RECOVERY: '/auth/recovery' as Route
	},

	DOCUMENTS: {
		PRIVACY: '/document/privacy-policy' as Route,
		TERMS: '/document/terms-of-use' as Route
	},

	ACCOUNT: {
		ROOT: '/account' as Route,
		ORDERS: '/account/orders' as Route,
		SETTINGS: '/account/settings' as Route,
		SESSIONS: '/account/sessions' as Route,
		CONNECTIONS: '/account/connections' as Route
	}
}
