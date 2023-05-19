'use client'

import { useState, useEffect } from 'react'

import Header from '@/components/Header'
import ChatArea from '@/components/ChatArea'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'

import Chat from '@/types/Chat'

import { v4 as uuidv4 } from 'uuid'

export default function Home() {
	const [chats, setChats] = useState<Chat[]>([]) 
	const [currentChat, setCurrentChat] = useState<Chat | undefined>()
	const [currentChatId, setCurrentChatId] = useState('')

	const [isAiLoading, setIsAiLoading] = useState(false)

	const [isSidebarOpened, setIsSidebarOpened] = useState(false)
	
	const handleCloseSidebarClick = () => setIsSidebarOpened(false)
	
	const handleOpenSidebarClick = () => setIsSidebarOpened(true)

	const handleNewChatCreation = () => {
		if (!isAiLoading) 
			setCurrentChatId('')
	}

	const handleChatsDeletion = () => {
		if (!isAiLoading) {
			setChats([])	
			setCurrentChatId('')
		}
	}

	const handleSendMessage = (message: string) => {
		if (!currentChatId) {
			const newChatId = uuidv4()
			
			setChats(prevState => [{
				id: newChatId, 
				title: message,
				messages: [{ id: uuidv4(), author: 'me', body: message }]
			}, ...prevState])

			setCurrentChatId(newChatId)
		}
		
		else {
			setChats(prevState => {
				return prevState.map(chat => chat.id === currentChatId 
					? {...chat, messages: [...chat.messages, { 
						id: uuidv4(), author: 'me', body: message 
					}]}	
					: chat 
				) 
			})
		}
	}

	useEffect(() => {
		setCurrentChat(chats.find(chat => chat.id === currentChatId))
	}, [currentChatId, chats])
	
	return (
		<div className="flex min-h-screen bg-gpt-gray">
			<Sidebar isOpened={isSidebarOpened} handleCloseSidebarClick={handleCloseSidebarClick}>
			</Sidebar>

			<div className="flex flex-col w-full">
				<Header handleOpenSidebarClick={handleOpenSidebarClick} />

				<ChatArea chat={currentChat} />

				<Footer disabled={isAiLoading ? true : false} onSendMessage={handleSendMessage} />
			</div>
			
		</div>
	)
}