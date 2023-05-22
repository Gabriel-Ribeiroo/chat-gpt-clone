'use client'

import { useState, useEffect } from 'react'

import Header from '@/components/Header'
import ChatArea from '@/components/ChatArea'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'

import useChat from '@/stores/chat/chat'
import { selectCurrentChat } from '@/stores/chat/selectors'

export default function Home() {
	const [getAiResponse, aiLoading] = useChat(state => [ state.getAiResponse, state.aiLoading])

	const currentChat = useChat(selectCurrentChat)

	const [isSidebarOpened, setIsSidebarOpened] = useState(false)
	
	const handleCloseSidebarClick = () => setIsSidebarOpened(false)
	
	const handleOpenSidebarClick = () => setIsSidebarOpened(true)

	useEffect(() => {
		if (aiLoading)
			getAiResponse(currentChat!.messages)
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