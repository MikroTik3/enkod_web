import { Slot, Slottable } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/utils/tw-merge'

const buttonVariants = cva(
	`inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap
	font-medium rounded-md text-sm transition-all duration-200
	will-change-transform active:scale-[0.98]
	disabled:pointer-events-none disabled:opacity-50
	[&_svg]:pointer-events-none
	[&_svg:not([class*='size-'])]:size-4
	[&_svg]:shrink-0 shrink-0
	outline-none
	focus-visible:ring-2`,
	{
		variants: {
			variant: {
				default: `
					bg-neutral-900 text-white
					shadow-[0px_0px_10px_0px_rgba(255,255,255,0.2)_inset]
					ring ring-white/20 ring-offset-2 ring-offset-neutral-900 ring-inset
					hover:shadow-[0px_0px_20px_0px_rgba(255,255,255,0.4)_inset]
					hover:ring-white/40
					dark:bg-white
					dark:text-black
					dark:shadow-[0px_0px_10px_0px_rgba(0,0,0,0.2)_inset]
					dark:ring-black/20
					dark:ring-offset-white
					dark:hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.3)_inset]
					dark:hover:ring-black/50
				`,
				destructive: `
					bg-red-600 text-white
					shadow-[0px_0px_10px_0px_rgba(255,255,255,0.15)_inset]
					ring ring-red-400/30 ring-offset-2 ring-offset-red-600 ring-inset
					hover:bg-red-500
					hover:shadow-[0px_0px_20px_0px_rgba(255,255,255,0.25)_inset]
					hover:ring-red-300/50

					dark:bg-red-600
					dark:text-white
					dark:shadow-[0px_0px_10px_0px_rgba(255,255,255,0.1)_inset]
					dark:ring-red-500/30
					dark:ring-offset-neutral-950
					dark:hover:bg-red-500
					dark:hover:shadow-[0px_0px_20px_0px_rgba(255,255,255,0.2)_inset]
					dark:hover:ring-red-400/50
				`,
				outline: 'border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground',
				secondary:
					'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline'
			},
			size: {
				default: 'h-9 px-4 py-2 has-[>svg]:px-3',
				sm: 'h-8 px-3 has-[>svg]:px-2.5',
				lg: 'h-11 px-6 has-[>svg]:px-4',
				icon: 'size-9 rounded-full'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	}
)

export interface ButtonProps
	extends
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
	isLoading?: boolean
	children?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant,
			size,
			children,
			isLoading = false,
			asChild = false,
			...props
		},
		ref
	) => {
		const Comp = asChild ? Slot : 'button'
		return (
			<Comp
				className={cn(
					buttonVariants({ variant, size, className }),
					'flex gap-2'
				)}
				ref={ref}
				disabled={isLoading ?? props.disabled}
				{...props}
			>
				{isLoading && (
					<Loader2 className='size-4! animate-spin' />
				)}
				<Slottable>{children}</Slottable>
			</Comp>
		)
	}
)
Button.displayName = 'Button'

export { Button, buttonVariants }
