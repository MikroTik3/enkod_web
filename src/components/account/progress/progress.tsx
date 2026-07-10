'use client'

import { useState } from 'react'

import { Heading } from '@/components/shared/heading'
import { Tabs } from '@/components/ui/tabs'

import { CoursesList } from './courses-list'
import { CoursesTab } from './courses-tab'
import { Leaderboard } from './leaderboard'
import { UserStats } from './user-stats'

export function Progress() {
	const [activeTab, setActiveTab] = useState('overview')

	const tabs = [
		{
			title: 'Огляд',
			value: 'overview',
			content: (
				<div className='space-y-6'>
					<UserStats />

					<CoursesList
						onViewAll={() => setActiveTab('courses')}
					/>

					<Leaderboard
						limit={5}
						showButton
						onViewAll={() =>
							setActiveTab('leaderboard')
						}
					/>
				</div>
			)
		},
		{
			title: 'Курси',
			value: 'courses',
			content: (
				<div className='space-y-6'>
					<CoursesTab />
				</div>
			)
		},
		{
			title: 'Рейтинг',
			value: 'leaderboard',
			content: (
				<div className='space-y-6'>
					<Leaderboard />
				</div>
			)
		}
	]

	return (
		<div className='w-full pb-10'>
			<div className='mx-auto flex max-w-6xl flex-col gap-6'>
				<Heading
					title='Мій прогрес'
					description='Відстежуйте свій прогрес у навчанні, досягнення та рейтинг серед інших користувачів'
				/>

				<div className='relative w-full [perspective:1000px]'>
					<Tabs
						tabs={tabs}
						activeTab={activeTab}
						setActiveTab={setActiveTab}
					/>
				</div>
			</div>
		</div>
	)
}
