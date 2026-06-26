import Turnstile, { type TurnstileProps } from 'react-turnstile'

interface CaptchaProps extends Omit<TurnstileProps, 'sitekey'> {
	onVerify: (token: string) => void
}

export function Captcha({ onVerify, ...props }: CaptchaProps) {
	return (
		<Turnstile
			sitekey={process.env['NEXT_PUBLIC_TURNSTILE_SITE_KEY']!}
			onVerify={onVerify}
			theme='light'
			size='flexible'
			style={{
				width: '100%'
			}}
			{...props}
		/>
	)
}
