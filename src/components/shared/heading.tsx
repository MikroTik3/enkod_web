interface HeadingProps {
	title: string
	description: string
}

export function Heading({ title, description }: HeadingProps) {
	return (
		<div className='space-y-1'>
			<h1 className='text-2xl font-medium'>{title}</h1>
			<p className='text-muted-foreground text-sm'>{description}</p>
		</div>
	)
}
