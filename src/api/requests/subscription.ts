import type { InitSubscriptionResponse } from '../generated'
import { instance } from '../instance'

export const initializeSubscription = async () => {
	const { data } =
		await instance.post<InitSubscriptionResponse>('/subscription/init')

	return data
}
