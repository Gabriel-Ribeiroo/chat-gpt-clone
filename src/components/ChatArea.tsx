import ChatMessageItem from './ChatMessageItem'
import ChatMessageLoading from './ChatMessageLoading'
import ChatPlaceholder from './ChatPlaceholder'

import useChat from '@/stores/chat/chat'
import { selectCurrentChat } from '@/stores/chat/selectors'

export default function ChatArea() {
	const [aiLoading] = useChat(state => [state.aiLoading])
	
	const currentChat = useChat(selectCurrentChat)
	
	return (
		<main className={`overflow-y-auto flex-auto h-0 ${!currentChat && 'flex items-center justify-center'}`}>
			{!currentChat && <ChatPlaceholder />}

			{currentChat && currentChat.messages.map(message => (
				<ChatMessageItem key={message.id} message={message} />
			))}

			{aiLoading && <ChatMessageLoading />}
		</main>
	)
}