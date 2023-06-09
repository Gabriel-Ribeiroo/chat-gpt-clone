'use client'

import { useRouter } from 'next/navigation'

import MenuIcon from './icons/MenuIcon'
import AddIcon from './icons/AddIcon'

import useChat from '@/stores/chat/chat'
import useSidebar from '@/stores/sidebar/sidebar'
import { selectCurrentChat } from '@/stores/chat/selectors'

export default function Header() {
	const router = useRouter()
	
	const createNewChat = useChat(state => state.createNewChat) 
	const currentChat = useChat(selectCurrentChat)
	
	const toggleSidebar = useSidebar(state => state.toggleSidebar)

	const handleNewChatCreation = () => {
		router.push('/')
		createNewChat()
	}

	return (
		<header 
			className="flex justify-between items-center w-full 
			border-b border-b-gray-600 p-2 md:hidden text-white bg-gpt-gray"
		>
			<div onClick={toggleSidebar}>
				<MenuIcon width={24} height={24} />
			</div>

			<p className="mx-2 truncate">{currentChat?.title || 'Nova Conversa'}</p>

			<div onClick={handleNewChatCreation}>
				<AddIcon width={24} height={24} />
			</div>
		</header>
	)
}