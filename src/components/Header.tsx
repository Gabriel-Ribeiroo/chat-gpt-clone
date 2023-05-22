import MenuIcon from './icons/MenuIcon'
import AddIcon from './icons/AddIcon'

import useChat from '@/stores/chat/chat'
import { selectCurrentChat } from '@/stores/chat/selectors'

interface Props {
	handleOpenSidebarClick: () => void 
}

export default function Header({ handleOpenSidebarClick }: Props) {
	const currentChat = useChat(selectCurrentChat)
	
	return (
		<header 
			className="flex justify-between items-center w-full 
			border-b border-b-gray-600 p-2 md:hidden text-white"
		>
			<div onClick={handleOpenSidebarClick}>
				<MenuIcon width={24} height={24} />
			</div>

			<p className="mx-2 truncate">{currentChat?.title || 'Nova Conversa'}</p>

			<div>
				<AddIcon width={24} height={24} />
			</div>
		</header>
	)
}