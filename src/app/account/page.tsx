import { UserNavigation } from '@/components/layout/user-navigation'
import { ProfileCard } from '@/components/shared/profile-card'

export default function AccountPage() {
      return (
<div className='w-full lg:max-w-[19rem]'>
                                          <ProfileCard />
                                          <UserNavigation />
                                    </div>
      )
}
