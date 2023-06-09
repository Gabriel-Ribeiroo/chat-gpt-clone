'use client'

import { useRouter, usePathname } from 'next/navigation'

import SidebarChatButton from './SidebarChatButton'
import ToggleSidebarButton from './ToggleSidebarButton'
import SidebarButton from './SidebarButton'
import CloseIcon from '../icons/CloseIcon'
import AddIcon from '../icons/AddIcon'
import TrashIcon from '../icons/TrashIcon'
import MoonIcon from '../icons/MoonIcon'
import SunIcon from '../icons/SunIcon'

import { useTheme } from 'next-themes'

import useChat from '@/stores/chat/chat'
import useSidebar from '@/stores/sidebar/sidebar'

export default function Sidebar() {
	const router = useRouter() 
	const pathname = usePathname() 
	
	const [isOpened, toggleSidebar] = useSidebar(state => [state.isOpened, state.toggleSidebar])
	
	const [chats, currentChatId, createNewChat, removeAllChats, aiLoading] = useChat(state => 
		[state.chats, state.currentChatId, state.createNewChat, state.removeAllChats, state.aiLoading]
	)

	const { theme, setTheme } = useTheme()

	const handleAllChatsDeletion = () => {
		pathname !== '/' && router.push('/')
		removeAllChats() 
	}

	const handleNewChatCreation = () => {
		pathname !== '/' && router.push('/')
		createNewChat()
	}

	return (
		<aside 
			className={`fixed top-0 bottom-0 left-0 text-white bg-gray-600/75 z-10 md:bg-transparent md:static 
			transition-all ${isOpened.mobile ? 'w-screen' : 'w-0'} ${isOpened.desktop ? 'md:w-64' : 'md:w-0'}`}
		>
			<div 
				className={`flex h-screen transition-all duration-200 
				${isOpened.mobile ? 'ml-0' : '-ml-96'} ${isOpened.desktop ? 'md:ml-0' : 'md:-ml-96'}`} 
			>
				<div className="flex flex-col w-64 bg-gpt-deepgray p-2">
					
					<div className="flex gap-2">
						<button 
							onClick={handleNewChatCreation}
							aria-label="Create new chat"
							className="flex flex-1 items-center gap-3 p-3 cursor-pointer hover:bg-gray-500/20 
							rounded-md border border-white/20 text-sm transition-all duration-200"
						>
							<AddIcon width={20} height={20} />
							<p>Nova Conversa</p>
						</button>

						<ToggleSidebarButton aria-label="Hide Sidebar" extraStyles="bg-gpt-deepgrey border-white/20" />
					</div>

					<nav className="flex-1 mt-2 overflow-y-auto">
						{chats.map(chat => (
							<SidebarChatButton key={chat.id} active={chat.id === currentChatId} chat={chat} />
						))}
					</nav>

					<div className="pt-2 border-t border-gray-700">
						<SidebarButton
							onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
							icon={theme === 'dark' 
								? <MoonIcon width={18} height={18} />
								: <SunIcon width={18} height={18} />
							}
						>
							{theme === 'dark' ? 'Modo Escuro' : 'Modo Claro'}							
						</SidebarButton>
						
						<SidebarButton 
							aria-label="Deletar Conversas" 
							icon={<TrashIcon />} 
							onClick={handleAllChatsDeletion}
						>
							Limpar todas as Conversas
						</SidebarButton> 
					</div>
				</div>

				<button 
					className="flex justify-center items-center w-10 h-10 mt-2 cursor-pointer md:hidden"
					aria-label="Hide sidebar"
					onClick={toggleSidebar}
				>
					<CloseIcon width={24} height={24} />
				</button>
			</div>
		</aside>
	)
}