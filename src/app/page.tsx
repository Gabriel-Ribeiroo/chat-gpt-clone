'use client'

import { useState } from 'react'

import Sidebar from '@/components/Sidebar'

export default function Home() {
  const [isSidebarOpened, setIsSidebarOpened] = useState(true)

	const handleCloseSidebarClick = () => {
		setIsSidebarOpened(false)
	}
	
	return (
		<main className="flex min-h-screen bg-gpt-gray">
			<Sidebar isOpened={isSidebarOpened} handleCloseSidebarClick={handleCloseSidebarClick}>
				<div className="w-16 h-96">...</div>
			</Sidebar>
		</main>
	)
}