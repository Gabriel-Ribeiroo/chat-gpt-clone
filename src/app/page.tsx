'use client'

import { useState, useEffect } from 'react'

import Header from '@/components/Header'
import ChatArea from '@/components/ChatArea'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'

import Chat from '@/types/Chat'

import { v4 as uuidv4 } from 'uuid'
import SidebarChatButton from '@/components/SidebarChatButton'

export default function Home() {
	const [chats, setChats] = useState<Chat[]>([]) 
	const [currentChat, setCurrentChat] = useState<Chat | undefined>()
	const [currentChatId, setCurrentChatId] = useState('')

	const [isAiLoading, setIsAiLoading] = useState(false)

	const [isSidebarOpened, setIsSidebarOpened] = useState(false)
	
	const handleCloseSidebarClick = () => setIsSidebarOpened(false)
	
	const handleOpenSidebarClick = () => setIsSidebarOpened(true)

	const handleNewChatClick = () => {
		if (!isAiLoading) 
			setCurrentChatId('')
	}

	const handleChatsDeletion = () => {
		if (!isAiLoading) {
			setChats([])	
			setCurrentChatId('')
		}
	}

	const handleChatChangeClick = (id: string) => {
		if (!isAiLoading)
			setCurrentChatId(id)
	}

	const handleChatDeleteClick = () => {
		if (!isAiLoading) {
			setChats(prevState => {
				return prevState.filter(chat => chat.id !== currentChatId)
			})

			setCurrentChatId('')
		}
	}

	const handleChatTitleChange = (newTitle: string) => {
		if (!isAiLoading) {
			setChats(prevState => {
				return prevState.map(chat => chat.id === currentChatId 
					? { ...chat, title: newTitle }
					: chat 
				)
			})
		}
	}

	const handleSendMessage = (message: string) => {
		if (currentChatId === '') {
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

		setIsAiLoading(true)
	}

	const getAiResponse = () => {
		setTimeout(() => {
			setChats(prevState => {
				return prevState.map(chat => chat.id === currentChatId
					? { ...chat, messages: [...chat.messages, {
						id: uuidv4(),
						author: 'ai',
						body: 'Olá! Como posso te ajudar?'
					}]}	
					: chat 
				)
			})
			
			setIsAiLoading(false)
		})
	}

	useEffect(() => {
		setCurrentChat(chats.find(chat => chat.id === currentChatId))
	}, [currentChatId, chats])

	useEffect(() => {
		if (isAiLoading)
			getAiResponse()
	}, [isAiLoading])
	
	return (
		<div className="flex min-h-screen bg-gpt-gray">
			<Sidebar 
				isOpened={isSidebarOpened} 
				handleCloseSidebarClick={handleCloseSidebarClick}
				handleNewChatClick={handleNewChatClick} 
				handleChatsDeletion={handleChatsDeletion}
			>
				{chats.map(chat => (
					<SidebarChatButton 
						key={chat.id} 
						active={chat.id === currentChatId}
						handleChatChangeClick={handleChatChangeClick}
						handleChatDeleteClick={handleChatDeleteClick}
						handleChatTitleChange={handleChatTitleChange}
						chat={chat} 
					/>
				))}
			</Sidebar>
			
			<div className="flex flex-col w-full">
				<Header title={currentChat?.title} handleOpenSidebarClick={handleOpenSidebarClick} />

				<ChatArea isLoading={isAiLoading} chat={currentChat} />

				<Footer disabled={isAiLoading ? true : false} onSendMessage={handleSendMessage} />
			</div>
			
		</div>
	)
}