import type { Metadata, Viewport } from 'next'

import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'

import { cn } from '@/lib/utils'

import '@/styles/globals.css'

import { APP_CONFIG, SEO, geistSans } from '../constants'

import { ThemeProvider } from '@/providers'
import { FingerprintProvider } from '@/providers/fingerprint-provider'
import { TanstackQueryProvider } from '@/providers/tanstack-provider'

export const metadata: Metadata = {
	title: {
		absolute: SEO.name,
		template: `%s — ${SEO.name}`
	},
	description: SEO.description,
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
		title: SEO.name,
		description: SEO.description,
		type: 'website',
		emails: ['dotsenk20034@gmail.com'],
		siteName: SEO.name,
		locale: 'uk_UA',
		images: [
			{
				url: new URL('https://encod.com/opengraph.png'),
				width: 1200,
				height: 630,
				alt: SEO.name
			}
		],
		url: APP_CONFIG.baseUrl
	},
	twitter: {
		card: 'summary_large_image',
		title: SEO.name,
		description: SEO.description,
		images: [
			{
				url: new URL('https://encod.com/opengraph.png'),
				width: 1200,
				height: 630,
				alt: SEO.name
			}
		]
	},
	formatDetection: SEO.formatDetection
}

export const viewport: Viewport = {
	width: 'device-width',
	themeColor: '#ffffff'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			className={cn(geistSans.variable, 'font-sans')}
			lang='uk'
			suppressHydrationWarning
		>
			<body>
				<TanstackQueryProvider>
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
				</TanstackQueryProvider>
			</body>
		</html>
	)
}
