'use client'

import { useState } from 'react'

import Header from '@/components/Header'
import ChatArea from '@/components/ChatArea'
import Sidebar from '@/components/Sidebar'

import Chat from '@/types/Chat'

export default function Home() {
  const [isSidebarOpened, setIsSidebarOpened] = useState(false)
	const [currentChat, setCurrentChat] = useState<Chat>({
		id: '123',
		title: 'Bla blu',
		messages: [
			{ id: '99', author: 'me', body: 'Eai' },
			{ id: '99', author: 'ai', body: 'Olá! como posso te ajudar?' },
		]
	})

	const handleCloseSidebarClick = () => setIsSidebarOpened(false)
	
	const handleOpenSidebarClick = () => setIsSidebarOpened(true)
	
	return (
		<div className="flex min-h-screen bg-gpt-gray">
			<Sidebar isOpened={isSidebarOpened} handleCloseSidebarClick={handleCloseSidebarClick}>
				<div className="w-16 h-96">...</div>
			</Sidebar>

			<div className="flex flex-col w-full">
				<Header handleOpenSidebarClick={handleOpenSidebarClick} />

				<ChatArea chat={currentChat} />
			</div>
			
		</div>
	)
}