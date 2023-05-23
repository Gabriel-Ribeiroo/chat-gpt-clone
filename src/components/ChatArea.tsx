import { useEffect, useRef, useState } from 'react'

import ChatMessageItem from './ChatMessageItem'
import ChatMessageLoading from './ChatMessageLoading'
import ChatPlaceholder from './ChatPlaceholder'
import ArrowDownIcon from './icons/ArrowDownIcon'

import useChat from '@/stores/chat/chat'
import { selectCurrentChat } from '@/stores/chat/selectors'

export default function ChatArea() {
	const main = useRef<HTMLDivElement>(null)

	const [isScrollFarBottom, setIsScrollFarBottom] = useState(false)

	const [aiLoading] = useChat(state => [state.aiLoading])
	
	const currentChat = useChat(selectCurrentChat)

	const handleScrollToBottom = () => {
		main.current?.scrollTo(0, main.current?.scrollHeight)
	}

	const handleScroll = () => {
		const scrollPosition = (Math.floor(main.current?.scrollTop ?? 0)) + (Math.floor(main.current?.clientHeight ?? 0))
		const mainTotalHeight = Math.floor(main.current?.scrollHeight ?? 0)

		if (scrollPosition < mainTotalHeight && isScrollFarBottom === false)
			setIsScrollFarBottom(true)

		else if (scrollPosition === mainTotalHeight && isScrollFarBottom === true)
			setIsScrollFarBottom(false)
	}

	useEffect(() => {
		handleScrollToBottom()
 	}, [aiLoading])

	return (
		<main 
			ref={main} 
			onScroll={handleScroll}
			className={`scroll-smooth overflow-y-auto flex-auto 
			h-0 ${!currentChat && 'flex items-center justify-center'}`}
		>
			{!currentChat && <ChatPlaceholder />}

			{currentChat && currentChat.messages.map(message => (
				<ChatMessageItem key={message.id} message={message} />
			))}

			{aiLoading && <ChatMessageLoading />}

				{isScrollFarBottom && (
					<button 
						onClick={handleScrollToBottom}
						className="fixed bottom-[124px] right-6 flex items-center justify-center w-7 cursor-pointer 
						h-7 m-1 text-gray-200 bg-white/10 border border-white/10 rounded-full z-10"
					>
						<ArrowDownIcon width={16} height={16} />
					</button>
				)
			}
		</main>
	)
}