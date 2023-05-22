'use client'

import { useState, useEffect } from 'react'

import Header from '@/components/Header'
import ChatArea from '@/components/ChatArea'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'

import useChat from '@/stores/chat/chat'

export default function Home() {
	const [getAiResponse, aiLoading] = useChat(state => [ state.getAiResponse, state.aiLoading])

	const removeCurrentChat = useChat(state => state.removeCurrentChat)
	const chats = useChat(state => state.chats)
	const currentId = useChat(state => state.currentChatId)

	const [isSidebarOpened, setIsSidebarOpened] = useState(false)
	
	const handleCloseSidebarClick = () => setIsSidebarOpened(false)
	
	const handleOpenSidebarClick = () => setIsSidebarOpened(true)

	useEffect(() => {
		if (aiLoading)
			getAiResponse()
	}, [aiLoading])

	return (
		<div className="flex min-h-screen bg-gpt-gray">
			<Sidebar isOpened={isSidebarOpened} handleCloseSidebarClick={handleCloseSidebarClick} />
			
			<div className="flex flex-col w-full">
				<Header handleOpenSidebarClick={handleOpenSidebarClick} />

				<ChatArea />

				<Footer />
				
			</div>
			
		</div>
	)
}