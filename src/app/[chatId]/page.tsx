'use client'

import { useRouter } from 'next/navigation'

import { useEffect, useState, useRef } from 'react'

import ChatMessageItem from '@/components/chat/ChatMessageItem'
import ChatMessageLoading from '@/components/chat/ChatMessageLoading'
import ArrowDownIcon from '@/components/icons/ArrowDownIcon'

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
	
	const [isScrollFarFromBottom, setIsScrollFarFromBottom] = useState(false)

		const scrollToBottom = () => {
			main.current?.scrollTo(0, main.current?.scrollHeight)
		}

	const handleMainScroll = () => {
		const clientHeight = Math.floor(main.current!.clientHeight)
		const scrollTop = Math.floor(main.current!.scrollTop)
		const scrollHeight = Math.floor(main.current!.scrollHeight)

		if ((clientHeight + scrollTop) < scrollHeight && isScrollFarFromBottom === false) 
			setIsScrollFarFromBottom(true)
			
		else if ((clientHeight + scrollTop) === scrollHeight && isScrollFarFromBottom === true) 
			setIsScrollFarFromBottom(false)
	}
	
	useEffect(() => {
		if (chatId !== currentChatId)
			router.push('/')
	}, [])

	useEffect(() => {
		if (aiLoading) 
			getAiResponse(currentChat!.messages)

		scrollToBottom()
	}, [aiLoading])

	return (
		<main 
			ref={main} 
			onScroll={handleMainScroll}
			className="flex-1 overflow-y-auto scroll-smooth"
		>
			{currentChat?.messages.map(message => (
				<ChatMessageItem key={message.id} message={message} />
			))}
			
			{aiLoading && <ChatMessageLoading />}
			
			{isScrollFarFromBottom && (
				<button 
					onClick={scrollToBottom}
					className="fixed right-6 bottom-[138px] border border-white/10
					md:bottom-[120px] p-1 rounded-full text-gray-200 bg-white/10"
				>
					<ArrowDownIcon />
				</button>
			)}
		</main>
	)
}