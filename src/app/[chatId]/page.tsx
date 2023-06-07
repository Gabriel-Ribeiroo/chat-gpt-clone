'use client'

import { useRouter, usePathname } from 'next/navigation'

import { useEffect } from 'react'

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
	const pathname = usePathname() 
	
	const currentChat = useChat(selectCurrentChat)
	const [currentChatId, aiLoading, getAiResponse] = useChat(state => 
		 [state.currentChatId, state.aiLoading, state.getAiResponse]
	)

	useEffect(() => {
		if (pathname.slice(1) !== currentChatId)
			router.push('/')
	}, [])

	useEffect(() => {
		if (aiLoading) 
			getAiResponse(currentChat!.messages)
	}, [aiLoading])

	return (
		<main className="flex-1">
			{currentChat?.messages.map(message => (
				<ChatMessageItem key={message.id} message={message} />
			))}

			{aiLoading && <ChatMessageLoading />}
		</main>
	)
}