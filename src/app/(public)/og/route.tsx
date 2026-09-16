import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url)

		const title = searchParams.get('title')?.slice(0, 100) || 'Enkod'
		const subtitle = searchParams.get('subtitle')?.slice(0, 200)

		return new ImageResponse(
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					height: '100%',
					width: '100%',
					backgroundColor: 'black',
					padding: '0 80px'
				}}
			>
				<div
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundSize: '40px 40px',
						backgroundImage:
							'linear-gradient(to right, #262626 1px, transparent 1px), linear-gradient(to bottom, #262626 1px, transparent 1px)'
					}}
				/>

        <div
  style={{
    position: 'absolute',
    top: -200,
    left: -100,
    width: 800,
    height: 800,
    background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
  }}
/>
<div
  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 96,
    height: 96,
    marginBottom: 48,
    borderRadius: 20,
    boxShadow: '0 0 60px rgba(59,130,246,0.4)',
  }}
>
  <img alt="Enkod" width={96} height={96} src={`https://enkod.top/logo-dark.png`} />
</div>

				<div
					style={{
						display: 'flex',
						maxWidth: 900,
						fontSize: title.length > 28 ? 64 : 76,
						fontWeight: 700,
						lineHeight: 1.1,
						color: 'white'
					}}
				>
					{title}
				</div>

				{subtitle && (
					<div
						style={{
							display: 'flex',
							marginTop: 20,
							maxWidth: 820,
							fontSize:
								subtitle.length > 90 ? 28 : 32,
							lineHeight: 1.4,
							color: '#a8a29e'
						}}
					>
						{subtitle}
					</div>
				)}
			</div>,
			{
				width: 1200,
				height: 630
			}
		)
	} catch (e) {
		console.error(
			`Error generating image: ${e instanceof Error ? e.message : 'Unknown error'}`
		)
		return new Response('Failed to generate the image', {
			status: 500
		})
	}
}
