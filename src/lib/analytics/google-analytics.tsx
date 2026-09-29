import { env } from '@/config/env'
import Script from 'next/script'

export function GoogleAnalytics() {
	if (process.env.NODE_ENV !== 'production') {
		return null
	}

	return (
		<>
			<Script
				src={`https://www.googletagmanager.com/gtag/js?id=${env.GOOGLE_ANALYTICS_ID}`}
				strategy='afterInteractive'
			/>

			<Script id='google-analytics' strategy='afterInteractive'>
				{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', '${env.GOOGLE_ANALYTICS_ID}');
				`}
			</Script>
		</>
	)
}