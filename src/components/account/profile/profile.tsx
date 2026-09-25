'use client'

import { useCurrent } from '@/hooks'
import { AccountActions } from './account-actions'
import { Heading } from '@/components/shared/heading'
import { ProfileForm } from './profile-form'

export function Profile() {
      const { user } = useCurrent()

      return (
            <div className='w-full pb-10'>
                  <div className='mx-auto flex max-w-6xl flex-col gap-6'>
                        <Heading
                              title='Мій профіль'
                              description='Відстежуйте свій прогрес у навчанні, досягнення та рейтинг серед інших користувачів'
                        />

                        <div className='space-y-4'>
                              <ProfileForm user={user} />
                              <AccountActions />
                        </div>
                  </div>
            </div>
      )
}