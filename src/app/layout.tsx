import type { Metadata, Viewport } from 'next'

import { TooltipProvider } from '@/components/ui/tooltip'

import { cn } from '@/lib/utils'

import '@/styles/globals.css'

import { APP_CONFIG, SEO, geistSans } from '../constants'

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
						<TooltipProvider>
							{children}
						</TooltipProvider>
					</FingerprintProvider>
				</TanstackQueryProvider>
			</body>
		</html>
	)
}
