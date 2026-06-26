'use client'

import { useMutation } from '@tanstack/react-query'
import { ChartArea, LogOut, LucideUser2, Package, Settings } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { cookies } from '@/lib/cookie'
import { cn } from '@/lib/utils'

import { buttonVariants } from '../ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '../ui/dropdown-menu'

import { instance } from '@/api/instance'
import { logout } from '@/api/requests/session'
import { ROUTES } from '@/constants'
import { useCurrent } from '@/hooks'

export function UserMenu() {
	const router = useRouter()

	const { user } = useCurrent()

	const { mutate } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => logout(),
		onSuccess() {
			cookies.remove('token')

			delete instance.defaults.headers['X-Session-Token']
			router.push(ROUTES.AUTH.LOGIN())
		},
		onError(error: any) {
			toast.error(
				error.response?.data?.message ?? 'Помилка при виході'
			)
		}
	})

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div
					className={cn(
						buttonVariants({
							size: 'icon',
							variant: 'outline'
						}),
						'text-muted-foreground relative !hidden !size-8 !rounded-xl lg:!flex'
					)}
				>
					<LucideUser2 />
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56' align='end'>
				<DropdownMenuLabel className='font-normal'>
					<div className='flex flex-col space-y-1'>
						<p className='text-sm leading-none font-medium'>
							{user?.displayName}
						</p>
						<p className='text-muted-foreground text-xs leading-none'>
							{user?.email}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem asChild>
						<Link href={ROUTES.ACCOUNT.ROOT}>
							<ChartArea />
							Особистий кабинет
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<Link href={ROUTES.ACCOUNT.SETTINGS}>
							<Settings />
							Настройки
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => mutate()}
						className='text-rose-600!'
					>
						<LogOut className='text-rose-600!' />
						Вийти
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
