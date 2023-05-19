import ChatMessageItem from './ChatMessageItem'
import ChatPlaceholder from './ChatPlaceholder'

import Chat from '@/types/Chat'

interface Props {
	chat: Chat | undefined 
}

export default function ChatArea({ chat }: Props) {
	return (
		<main className={`overflow-y-auto flex-1 ${!chat && 'flex items-center justify-center'}`}>
			{!chat && <ChatPlaceholder />}

			{chat && chat.messages.map(message => (
				<ChatMessageItem key={message.id} message={message} />
			))}
		</main>
	)
}