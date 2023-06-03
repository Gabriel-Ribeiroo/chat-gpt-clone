'use client'

import { useEffect } from 'react'

import Header from '@/components/Header'
import ChatArea from '@/components/chat/ChatArea'
import Sidebar from '@/components/Sidebar/Sidebar'
import Footer from '@/components/Footer'
import SidebarIcon from '@/components/icons/SidebarIcon'

import useChat from '@/stores/chat/chat'
import useSidebar from '@/stores/sidebar/sidebar'
import { selectCurrentChat } from '@/stores/chat/selectors'

export default function Home() {
	const [getAiResponse, aiLoading] = useChat(state => [ state.getAiResponse, state.aiLoading])

	const currentChat = useChat(selectCurrentChat)

	const openSidebar = useSidebar(state => state.openSidebar)
 
	useEffect(() => {
		if (aiLoading)
			getAiResponse(currentChat!.messages)
	}, [aiLoading])

	return (
		<div className="flex min-h-screen bg-gpt-gray">
			<div 
				onClick={openSidebar}
				className="fixed top-2 left-2 p-3.5 border border-white/20 cursor-pointer
				rounded-md text-white hover:bg-gray-500/20 hidden md:block z-10 bg-gpt-gray"
			>
				<SidebarIcon />
			</div>
			
			<Sidebar />
			
			<div className="flex max-h-screen flex-col w-full">
				<Header />

				<ChatArea />

				<Footer />
			</div>			
		</div>
	)
}