'use client'

import { useRouter } from 'next/navigation'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'sonner'


import { Button } from '../../ui/button'
import { Card, CardContent } from '../../ui/card'
import { Skeleton } from '../../ui/skeleton'

import { ConnectionError } from './connection-error'
import { UnlinkProvider } from './unlink-provider'
import {
	useFetchSsoStatus,
	useGetAvailableSsoProviders,
	useSsoConnect,
} from '@/api/hooks'
import { SSO_PROVIDERS } from '@/constants'

export function Connections() {
	const router = useRouter()

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
					'Помилка під час підключення'
			)
		}
	})

	return (
		<>
			<div className='w-full'>
				

				<div className='mx-auto flex h-full max-w-xl flex-col gap-4 rounded-xl'>
					<h2 className='text-lg text-center font-medium'>Зовнішній вигляд</h2>

					<h3 className='px-1 text-xs font-medium tracking-wider text-muted-foreground uppercase'>
						Пов'язані акаунти
					</h3>
					
					<div className='space-y-3'>
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
												className='rounded-2xl bg-white p-0 shadow-sm ring-1 shadow-black/10 ring-black/10 md:row-span-2 dark:bg-neutral-900 dark:shadow-white/5 dark:ring-white/10'
											>
												<CardContent className='flex items-center justify-between gap-5 p-4 max-[440px]:flex-col max-[440px]:items-start'>
													<div className='flex items-center gap-x-3 max-[440px]:items-start'>
														<div className='relative flex aspect-square size-10.5 items-center justify-center rounded-lg bg-linear-to-b from-neutral-200 to-neutral-200 align-middle shadow-none ring-1 ring-white ring-offset-2 ring-offset-neutral-200 ring-inset dark:from-neutral-800 dark:to-neutral-800 dark:ring-neutral-900 dark:ring-offset-neutral-800'>
															{provider ===
															'google' ? (
																<FcGoogle className='size-5' />
															) : (
																<meta.icon
																	className='size-5'
																	style={{
																		color: meta.color
																	}}
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

					<p className='px-1 text-sm text-muted-foreground'>Підключіть і керуйте своїми обліковими записами на сторонніх сервісах, таких як Google і Facebook</p>
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
					<Skeleton className='size-10.5 rounded-lg' />
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
