import { IconApple } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import { ChevronRightIcon, TrophyIcon, UsersIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'

import { getLeaders } from '@/api/requests'

interface LeaderboardProps {
	limit?: number
	showButton?: boolean
	onViewAll?: () => void
}

export function Leaderboard({
	limit,
	showButton,
	onViewAll
}: LeaderboardProps) {
	const { data, isLoading } = useQuery({
		queryKey: ['get leaders'],
		queryFn: () => getLeaders()
	})

	const users = limit ? data?.slice(0, limit) : data

	return (
		<Card className='gap-0 p-0'>
			<CardHeader className='py-4'>
				<CardTitle className='flex items-center text-lg font-medium'>
					<div className='bg-muted text-muted-foreground mr-2 flex size-7 items-center justify-center rounded-lg border'>
						<UsersIcon className='size-4' />
					</div>
					Рейтинг користувачів
				</CardTitle>
				<CardDescription>
					Користувачі з найбільшою кількістю балів
				</CardDescription>
			</CardHeader>

			<Separator />

			<CardContent>
				<div className='space-y-4'>
					{users?.map((user, index) => {
						const position = index + 1

						return (
							<div
								key={index}
								className='flex items-center justify-between rounded-md p-2'
							>
								<div className='flex items-center'>
									<div className='bg-muted text-muted-foreground flex size-7 items-center justify-center rounded-lg border'>
										{position === 1 && (
											<TrophyIcon className='mx-auto size-4 text-yellow-500' />
										)}
										{position === 2 && (
											<TrophyIcon className='mx-auto size-4 text-gray-400' />
										)}
										{position === 3 && (
											<TrophyIcon className='mx-auto size-4 text-amber-700' />
										)}
										{position > 3 &&
											position}
									</div>

									<div className='ml-4 flex items-center gap-4'>
										<Avatar>
											<AvatarImage
												src={user.avatar}
												className='border'
												alt={
													user.displayName
												}
											/>
											<AvatarFallback>
												{user?.displayName.slice(
													0,
													1
												)}
											</AvatarFallback>
										</Avatar>

										<div className='flex items-center gap-2'>
											<p className='font-medium'>
												{
													user.displayName
												}
											</p>

											{user.isPremium && (
												<span className='flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700 dark:border dark:border-yellow-500/20 dark:bg-yellow-500/10 dark:text-yellow-300'>
													<IconApple className='size-3 text-yellow-500 dark:text-yellow-400' />
													Живчик
												</span>
											)}
										</div>
									</div>
								</div>

								<div className='font-medium'>
									{user.points} балів
								</div>
							</div>
						)
					})}
				</div>
			</CardContent>

			{showButton && (
				<CardFooter>
					<Button className='w-full' onClick={onViewAll}>
						Переглянути повний рейтинг
						<ChevronRightIcon className='ml-2 size-4' />
					</Button>
				</CardFooter>
			)}
		</Card>
	)
}
