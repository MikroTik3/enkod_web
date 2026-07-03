'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'sonner'

import { Heading } from '@/components/shared/heading'

import { Button } from '../../ui/button'
import { Card, CardContent } from '../../ui/card'
import { Skeleton } from '../../ui/skeleton'

import { ConnectionError } from './connection-error'
import { UnlinkProvider } from './unlink-provider'
import { TelegramAuthRequest } from '@/api/generated'
import {
	useFetchSsoStatus,
	useGetAvailableSsoProviders,
	useSsoConnect,
	useTelegramConnect
} from '@/api/hooks'
import { ROUTES, SSO_PROVIDERS } from '@/constants'

function base64DecodeUnicode(str: string) {
	try {
		return decodeURIComponent(
			atob(str.replace(/-/g, '+').replace(/_/g, '/'))
				.split('')
				.map(
					c =>
						'%' +
						('00' + c.charCodeAt(0).toString(16)).slice(
							-2
						)
				)
				.join('')
		)
	} catch {
		return null
	}
}

export function Connections() {
	const router = useRouter()

	const queryClient = useQueryClient()

	const { data: availableProviders, isLoading: isLoadingProviders } =
		useGetAvailableSsoProviders()
	const { data: ssoStatus, isLoading: isLoadingStatus } =
		useFetchSsoStatus()

	const { mutate, isPending } = useSsoConnect({
		onSuccess(data) {
			router.push(data.url as any)
		},
		onError(error: any) {
			toast.error(
				error.response?.data?.message ??
					'Ошибка при подключении'
			)
		}
	})

	const { mutate: connectTelegram } = useTelegramConnect({
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['sso status'] })
			router.push(ROUTES.ACCOUNT.CONNECTIONS)
		},
		onError() {
			toast.error('Ошибка при привязке Telegram')
		}
	})

	useEffect(() => {
		const hashString = window.location.hash.replace(
			'#tgAuthResult=',
			''
		)
		if (!hashString) return

		const decoded = base64DecodeUnicode(hashString)
		if (!decoded) return

		try {
			const user: TelegramAuthRequest = JSON.parse(decoded)
			connectTelegram(user)
			window.history.replaceState(
				null,
				'',
				ROUTES.ACCOUNT.CONNECTIONS
			)
		} catch {
			router.push(ROUTES.ACCOUNT.CONNECTIONS)
		}
	}, [connectTelegram])

	return (
		<>
			<div className='w-full'>
				<div className='mx-auto flex h-full max-w-5xl flex-col gap-4 rounded-xl'>
					<Heading
						title='Сторонні сервіси'
						description='Підключіть і керуйте своїми обліковими записами на сторонніх сервісах, таких як Google і Facebook'
					/>
					<div className='mt-2 space-y-5'>
						{isLoadingProviders || isLoadingStatus
							? Array.from({ length: 4 }).map(
									(_, index) => (
										<ConnectionsSkeleton
											key={index}
										/>
									)
								)
							: availableProviders?.map(
									(provider, index) => {
										const meta =
											SSO_PROVIDERS[
												provider as keyof typeof SSO_PROVIDERS
											]

										if (!meta)
											return null

										// @ts-ignore
										const isConnected =
											(
												ssoStatus as any
											)?.[provider]

										return (
											<Card
												key={
													index
												}
												 className='rounded-2xl bg-white shadow-sm ring-1 shadow-black/10 ring-black/10 md:row-span-2 dark:bg-neutral-900 dark:shadow-white/5 dark:ring-white/10 p-0'
											>
												<CardContent className='flex max-[440px]:flex-col max-[440px]:items-start items-center justify-between gap-5 p-4'>
													<div className='flex items-center max-[440px]:items-start gap-x-3'>
														<div className='rounded-lg border p-2.5'>
															{provider ===
															'google' ? (
																<FcGoogle className='size-5' />
															) : (
																<meta.icon
                                                                                                                       className="size-5"
                                                                                                                       style={{ color: meta.color }}
                                                                                                                />
															)}
														</div>
														<div>
															<h2 className='font-semibold'>
																{
																	meta.name
																}
															</h2>
															<p className='text-muted-foreground text-sm'>
																{
																	meta.description
																}
															</p>
														</div>
													</div>
													{isConnected ? (
														<UnlinkProvider
															provider={
																provider
															}
														/>
													) : (
														<Button
															onClick={() =>
																mutate(
																	{
																		provider
																	}
																)
															}
                                                                                                         className='max-[440px]:w-full'
															isLoading={
																isPending
															}
														>
															Привязать
														</Button>
													)}
												</CardContent>
											</Card>
										)
									}
								)}
					</div>
				</div>
			</div>
			<ConnectionError />
		</>
	)
}

export function ConnectionsSkeleton() {
	return (
		<Card className='py-0 shadow-none'>
			<CardContent className='flex items-center justify-between p-4'>
				<div className='flex items-center gap-x-3'>
					<Skeleton className='h-10 w-10 rounded-full' />
					<div className='flex flex-1 flex-col gap-2'>
						<Skeleton className='h-4 w-24 rounded-md' />
						<Skeleton className='h-3 w-40 rounded-md' />
					</div>
				</div>
				<Skeleton className='h-9 w-18 rounded-lg' />
			</CardContent>
		</Card>
	)
}
