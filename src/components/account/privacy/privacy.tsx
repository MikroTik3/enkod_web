'use client'

import { TwoStepAuthForm } from './two-step-auth-form'
import { useFetchMfaStatus } from '@/api/hooks'

export function Privacy() {
      const { data: status } = useFetchMfaStatus()

      return (
            <div className='w-full'>
                  <div className='mx-auto flex h-full max-w-xl flex-col gap-4'>
                        <h2 className='text-lg text-center font-medium'>Зовнішній вигляд</h2>
                      
                        <div className='mt-2 space-y-9'>
                              <TwoStepAuthForm status={status} />
                        </div>
                  </div>
            </div>
      )
}
