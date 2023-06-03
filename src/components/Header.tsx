import MenuIcon from './icons/MenuIcon'
import AddIcon from './icons/AddIcon'

import useChat from '@/stores/chat/chat'
import useSidebar from '@/stores/sidebar/sidebar'
import { selectCurrentChat } from '@/stores/chat/selectors'

export default function Header() {
	const currentChat = useChat(selectCurrentChat)
	
	const openSidebar = useSidebar(state => state.openSidebar)

	return (
		<header 
			className="flex justify-between items-center w-full 
			border-b border-b-gray-600 p-2 md:hidden text-white"
		>
			<div onClick={openSidebar}>
				<MenuIcon width={24} height={24} />
			</div>

			<p className="mx-2 truncate">{currentChat?.title || 'Nova Conversa'}</p>

			<div>
				<AddIcon width={24} height={24} />
			</div>
		</header>
	)
}