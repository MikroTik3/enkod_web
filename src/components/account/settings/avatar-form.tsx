import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ChangeEvent, useState } from 'react'
import { toast } from 'sonner'

import { getMediaSource } from '@/lib/utils'

import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'
import { Input } from '../../ui/input'

import type { AccountResponse } from '@/api/generated'
import { useGetMe } from '@/api/hooks/useGetMe'
import { changeAvatar } from '@/api/requests'

interface AvatarFormProps {
	user: AccountResponse | undefined
}

export function AvatarForm({ user }: AvatarFormProps) {
	const { data } = useGetMe()

	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationKey: ['change user avatar'],
		mutationFn: (data: FormData) => changeAvatar(data),
		onSuccess: data => {
			queryClient.refetchQueries({ queryKey: ['get me'] })
			toast.success('Аватар оновлено')
		},
		onError(error: any) {
			toast.error(
				error.response?.data?.message ??
					'Помилка під час оновлення аватара'
			)
		}
	})

	async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0]

		if (file) {
			const formData = new FormData()
			formData.append('file', file)

			mutate(formData)
		} else {
			toast.error('Будь ласка, виберіть файл')
		}
	}

	return (
		<div className='flex items-center gap-x-3'>
			<label className='cursor-pointer'>
				<Avatar className='size-14'>
					{data && (
						<AvatarImage
							src={data.avatar}
							className="border rounded-xl"
							alt='Аватар'
						/>
					)}
					<AvatarFallback className='text-xl border rounded-xl'>
						{data?.displayName?.slice(0, 1)}
					</AvatarFallback>
				</Avatar>
				<Input
					type='file'
					accept='image/jpeg, image/png, image/webp, image/gif'
					className='hidden'
					onChange={handleFileChange}
				/>
			</label>
			<div className='flex flex-col'>
				<h2 className='font-semibold'>Аватар</h2>
				<p className='text-muted-foreground text-sm'>
					Формати: JPEG, PNG, WEBP, GIF. Макс. розмір: 10
					МБ.
				</p>
			</div>
		</div>
	)
}
