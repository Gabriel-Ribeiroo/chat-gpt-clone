import SidebarChatButton from './SidebarChatButton'
import SidebarButton from './SidebarButton'
import CloseIcon from '../icons/CloseIcon'
import AddIcon from '../icons/AddIcon'
import TrashIcon from '../icons/TrashIcon'
import SidebarIcon from '../icons/SidebarIcon'

import useChat from '@/stores/chat/chat'
import useSidebar from '@/stores/sidebar/sidebar'

export default function Sidebar() {
	const [isOpened, closeSidebar] = useSidebar(state => [state.isOpened, state.closeSidebar])
	
	const [chats, currentChatId, createNewChat, removeAllChats] = useChat(state => 
		[state.chats, state.currentChatId, state.createNewChat, state.removeAllChats]
	)

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
							onClick={createNewChat}
							aria-label="Create new chat"
							className="flex flex-1 items-center gap-3 p-3 cursor-pointer hover:bg-gray-500/20 
							rounded-md border border-white/20 text-sm transition-all duration-200"
						>
							<AddIcon width={20} height={20} />
							<p>Nova Conversa</p>
						</button>

						<button 
							onClick={closeSidebar}
							aria-label="Hide sidebar"
							className="p-3.5 border border-white/20 transition-all duration-200
							rounded-md cursor-pointer hover:bg-gray-500/20 hidden md:block"
						>
							<SidebarIcon />
						</button>
					</div>

					<nav className="flex-1 mt-2 overflow-y-auto">
						{chats.map(chat => (
							<SidebarChatButton key={chat.id} active={chat.id === currentChatId} chat={chat} />
						))}
					</nav>

					<div className="pt-2 border-t border-gray-700">
						<SidebarButton 
							aria-label="Deletar Conversas" 
							icon={<TrashIcon />} 
							onClick={removeAllChats}
						>
							Limpar todas as Conversas
						</SidebarButton> 
					</div>
				</div>

				<button 
					className="flex justify-center items-center w-10 h-10 mt-2 cursor-pointer md:hidden"
					aria-label="Hide sidebar"
					onClick={closeSidebar}
				>
					<CloseIcon width={24} height={24} />
				</button>
			</div>
		</aside>
	)
}