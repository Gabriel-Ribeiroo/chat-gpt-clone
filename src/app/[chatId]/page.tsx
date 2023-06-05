'use client'

import { notFound } from 'next/navigation'

import ChatMessageItem from '@/components/chat/ChatMessageItem'
import ChatMessageLoading from '@/components/chat/ChatMessageLoading'

import useChat from '@/stores/chat/chat'
import { selectCurrentChat } from '@/stores/chat/selectors'

interface Props {
	params: { 
		chatId: string 
	}
}

export default function CurrentChat ({ params: { chatId } }: Props) {
	const currentChat = useChat(selectCurrentChat)
	const [currentChatId, aiLoading] = useChat(state => [state.currentChatId, state.aiLoading])

	if (currentChatId !== chatId)
		notFound()

	return (
		<main className="flex-1">
			{currentChat?.messages.map(message => (
				<ChatMessageItem key={message.id} message={message} />
			))}

			{aiLoading && <ChatMessageLoading />}
		</main>
	)
}