import ChatMessageItem from './ChatMessageItem'
import ChatMessageLoading from './ChatMessageLoading'
import ChatPlaceholder from './ChatPlaceholder'

import Chat from '@/types/Chat'

interface Props {
	chat: Chat | undefined 
	isLoading: boolean 
}

export default function ChatArea({ chat, isLoading }: Props) {
	return (
		<main className={`overflow-y-auto flex-1 ${!chat && 'flex items-center justify-center'}`}>
			{!chat && <ChatPlaceholder />}

			{chat && chat.messages.map(message => (
				<ChatMessageItem key={message.id} message={message} />
			))}

			{isLoading && <ChatMessageLoading />}
		</main>
	)
}