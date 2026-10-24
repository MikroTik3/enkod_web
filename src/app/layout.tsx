import type { Metadata, Viewport } from 'next'
import { cookies } from 'next/headers'

import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'

import { GoogleAnalytics } from '@/lib/analytics/google-analytics'
import { SESSION_MARKER } from '@/lib/marker'
import { cn } from '@/lib/utils'

import '@/styles/globals.css'

import { APP_CONFIG, SEO, geistSans } from '../constants'

import { ThemeProvider } from '@/providers'
import { AuthProvider } from '@/providers/auth-provider'
import { FingerprintProvider } from '@/providers/fingerprint-provider'
import { TanstackQueryProvider } from '@/providers/tanstack-provider'

export const metadata: Metadata = {
	metadataBase: new URL(APP_CONFIG.baseUrl),
	applicationName: SEO.name,
	keywords: SEO.keywords,
	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon.ico',
		apple: '/touch-icons/192x192.png',
		other: {
			rel: 'touch-icons',
			url: '/touch-icons/192x192.png',
			sizes: '192x192',
			type: 'image/png'
		}
	},
	manifest: '/manifest.webmanifest',
	openGraph: {
		type: 'website',
		emails: ['dotsenk20034@gmail.com'],
		locale: 'uk_UA',
		url: APP_CONFIG.baseUrl
	},
	formatDetection: SEO.formatDetection
}

export const viewport: Viewport = {
	width: 'device-width',
	themeColor: '#ffffff'
}

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	const cookieStore = await cookies()

	return (
		<html
			className={cn(geistSans.variable, 'font-sans')}
			lang='uk'
			suppressHydrationWarning
		>
			<body>
				<GoogleAnalytics />

				<TanstackQueryProvider>
					<AuthProvider
						hasSession={cookieStore.has(SESSION_MARKER)}
					>
						<FingerprintProvider>
							<ThemeProvider
								attribute='class'
								defaultTheme='light'
								enableSystem
								disableTransitionOnChange
							>
								<TooltipProvider>
									{children}
									<Toaster
										toastOptions={{
											classNames: {
												error: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200 border-0',
												success: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 border-0',
												warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200 border-0',
												info: 'bg-sky-100 text-sky-800 dark:bg-gray-800 dark:text-gray-200 border-0'
											}
										}}
									/>
								</TooltipProvider>
							</ThemeProvider>
						</FingerprintProvider>
					</AuthProvider>
				</TanstackQueryProvider>
			</body>
		</html>
	)
}
