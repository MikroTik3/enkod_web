'use client'

import { type ReactNode, createContext, useContext, useState } from 'react'

export type SessionStatus = 'authenticated' | 'guest'

const SessionContext = createContext<SessionStatus>('guest')

interface AuthProviderProps {
	hasSession: boolean
	children: ReactNode
}

export function AuthProvider({ hasSession, children }: AuthProviderProps) {
	const [status] = useState<SessionStatus>(() =>
		hasSession ? 'authenticated' : 'guest'
	)

	return (
		<SessionContext.Provider value={status}>
			{children}
		</SessionContext.Provider>
	)
}

export function useSession() {
	const status = useContext(SessionContext)

	return {
		status,
		isAuthorized: status === 'authenticated'
	}
}
