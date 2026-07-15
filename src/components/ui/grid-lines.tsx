import { cn } from '../../lib/utils'

export const GridLineHorizontal = ({
	className,
	offset
}: {
	className?: string
	offset?: string
}) => (
	<div
		style={
			{
				'--height': '1px',
				'--width': '5px',
				'--fade-stop': '90%',
				'--offset': offset || '200px',
				maskComposite: 'exclude'
			} as React.CSSProperties
		}
		className={cn(
			'[--background:#F5F7FC] dark:[--background:rgb(23_23_23)]',
			'[--color:rgba(21,10,53,0.15)] dark:[--color:rgba(255,255,255,0.12)]',

			'absolute left-[calc(var(--offset)/2*-1)] h-(--height) w-[calc(100%+var(--offset))]',

			'bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]',
			'bg-size-[var(--width)_var(--height)]',

			'[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),linear-gradient(black,black)]',
			'mask-exclude',

			'z-30',
			className
		)}
	/>
)

export const GridLineVertical = ({
	className,
	offset
}: {
	className?: string
	offset?: string
}) => (
	<div
		style={
			{
				'--height': '5px',
				'--width': '1px',
				'--fade-stop': '90%',
				'--offset': offset || '150px',
				maskComposite: 'exclude'
			} as React.CSSProperties
		}
		className={cn(
			'[--background:#F5F7FC] dark:[--background:rgb(23_23_23)]',
			'[--color:rgba(21,10,53,0.15)] dark:[--color:rgba(255,255,255,0.12)]',

			'absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-(--width)',

			'bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]',
			'bg-size-[var(--width)_var(--height)]',

			'[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),linear-gradient(black,black)]',
			'mask-exclude',

			'z-30',
			className
		)}
	/>
)
