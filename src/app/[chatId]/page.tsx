'use client'

import { useRouter } from 'next/navigation'

import { useEffect, useRef } from 'react'

import ChatMessageItem from '@/components/chat/ChatMessageItem'
import ChatMessageLoading from '@/components/chat/ChatMessageLoading'

import useChat from '@/stores/chat/chat'
import { selectCurrentChat } from '@/stores/chat/selectors'

interface Props {
	params: { 
		chatId: string 
	}
}

export default function CurrentChat({ params: { chatId } }: Props) {
	const router = useRouter() 

	const [currentChatId, aiLoading, getAiResponse] = useChat(state => 
		 [state.currentChatId, state.aiLoading, state.getAiResponse]
	)
	
	const currentChat = useChat(selectCurrentChat)

	const main = useRef<HTMLDivElement>(null)
	
	useEffect(() => {
		if (chatId !== currentChatId)
			router.push('/')
	}, [])

	useEffect(() => {
		if (aiLoading) 
			getAiResponse(currentChat!.messages)
	}, [aiLoading])

	return (
		<main 
			ref={main} 
			className="flex-1 overflow-y-auto scroll-smooth"
		>
			{currentChat?.messages.map(message => (
				<ChatMessageItem key={message.id} message={message} />
			))}
			
			{aiLoading && <ChatMessageLoading />}
		</main>
	)
}