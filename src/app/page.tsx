'use client'

import { useState } from 'react'

import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'

export default function Home() {
  const [isSidebarOpened, setIsSidebarOpened] = useState(false)

	const handleCloseSidebarClick = () => setIsSidebarOpened(false)
	
	const handleOpenSidebarClick = () => setIsSidebarOpened(true)
	
	return (
		<div className="flex min-h-screen bg-gpt-gray">
			<Sidebar isOpened={isSidebarOpened} handleCloseSidebarClick={handleCloseSidebarClick}>
				<div className="w-16 h-96">...</div>
			</Sidebar>

			<div className="flex flex-col w-full">
				<Header handleOpenSidebarClick={handleOpenSidebarClick} />
			</div>
			
		</div>
	)
}