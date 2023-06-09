'use client'

import { useRouter } from 'next/navigation'

import { useEffect, useRef, useState } from 'react'

import SendIcon from '../icons/SendIcon'

import useChat from '@/stores/chat/chat'

export default function ChatInput() {
	const router = useRouter()
	
	const [textAreaData, setTextAreaData] = useState('') 

	const textArea = useRef<HTMLTextAreaElement>(null)

	const [aiLoading, sendMessage, currentChatId] = useChat(state => 
		[state.aiLoading, state.sendMessage, state.currentChatId]
	)

	const handleSendMessage = () => {
		if (!aiLoading) {
			sendMessage(textAreaData.trim())
			setTextAreaData('')
		} 
	}

	const handleTextAreaKeyUp = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key.toLowerCase() === 'enter' && !event.shiftKey && !aiLoading) {
			event.preventDefault()
	
			sendMessage(textAreaData)
			setTextAreaData('')
		}
	}

	useEffect(() => {
		if (currentChatId)
			router.push(currentChatId)
	}, [currentChatId])

	useEffect(() => {
		if (textArea.current) {
			textArea.current.style.height = '0'
			
			const scrollHeight = textArea.current.scrollHeight

			textArea.current.style.height = `${scrollHeight}px`
		}
	}, [textAreaData])

	return (
		<div 
			className={`relative flex items-end border border-black/10 dark:border-gray-800/50 
			dark:bg-gpt-lightgray bg-white rounded-xl p-3 md:p-4 pr-0 text-white shadow-lg shadow-black/10
			${aiLoading && 'opacity-50'}`}
		>

			<textarea
				className="w-full bg-transparent resize-none outline-none h-7 max-h-48 text-gray-800 dark:text-white"
				placeholder="Digite uma mensagem"
				onKeyDown={handleTextAreaKeyUp}
				onChange={event => setTextAreaData(event.target.value)}
				value={textAreaData}
				ref={textArea}
			>
			</textarea>

			<button 
				onClick={handleSendMessage}
				aria-label="Send question"
				className={`absolute right-3 bottom-2 md:bottom-3 rounded-md p-2 
				${textAreaData.length ? 'bg-green-400 cursor-pointer' : 'text-gray-400 cursor-default'}`}
			>
				<SendIcon width={16} height={16} />
			</button>

		</div>
	)
}