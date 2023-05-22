import { useEffect, useRef, useState } from 'react'

import SendIcon from './icons/SendIcon'

import useChat from '@/stores/chat/chat'

export default function ChatInput() {
	const [textAreaData, setTextAreaData] = useState('') 
	
	const textArea = useRef<HTMLTextAreaElement>(null)

	const [aiLoading, sendMessage] = useChat(state => [state.aiLoading, state.sendMessage])

	const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setTextAreaData(event.target.value)
	}

	const handleSendMessage = () => {
		if (!aiLoading) {
			sendMessage(textAreaData.trim())
			setTextAreaData('')
		}  
	}

	const handleTextAreaKeyUp = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key.toLowerCase() === 'enter' && !event.shiftKey) {
			event.preventDefault()
	
			sendMessage(textAreaData)
			setTextAreaData('')
		}
	}

	useEffect(() => {
		if (textArea.current) {
			textArea.current.style.height = '0'
			
			const scrollHeight = textArea.current.scrollHeight

			textArea.current.style.height = `${scrollHeight}px`
		}
	}, [textAreaData])
	
	return (
		<div 
			className={`relative flex items-end border border-gray-800/50 bg-gpt-lightgray
			rounded-md p-3 pr-0 text-white shadow-lg ${'' && 'opacity-50'}`}
		>

			<textarea
				className="w-full bg-transparent resize-none outline-none h-7 max-h-48"
				placeholder="Digite uma mensagem"
				onKeyDown={handleTextAreaKeyUp}
				onChange={handleTextAreaChange}
				value={textAreaData}
				ref={textArea}
			>
			</textarea>

			<button 
				onClick={handleSendMessage}
				className={`absolute right-3 rounded p-1 
				${textAreaData.length ? 'hover:bg-black/20 cursor-pointer' : 'opacity-40 cursor-default'}`}
			>
				<SendIcon width={14} height={14} />
			</button>

		</div>
	)
}