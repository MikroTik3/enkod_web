import { type UseMutationOptions, useMutation } from '@tanstack/react-query'

import type { InitSubscriptionResponse } from '../generated'
import { initializeSubscription } from '../requests'

export const useInitializeSubscription = (
	options?: Omit<
		UseMutationOptions<
			InitSubscriptionResponse,
			unknown,
			any
		>,
		'mutationKey' | 'mutationFn'
	>
) =>
	useMutation({
		mutationKey: ['initializeSubscription'],
		mutationFn: () => initializeSubscription(),
		...options
	})