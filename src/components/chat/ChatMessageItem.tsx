import Message from '@/types/Message'
import UserIcon from '../icons/UserIcon'
import GPTIcon from '../icons/GptIcon'

interface Props {
	message: Message
}

export default function ChatMessageItem({ message }: Props) {
	return (
		<div 
			className={`overflow-x-hidden py-7 px-4 text-gray-800 dark:text-white
			${message.author === 'ai' ? 'border border-black/10 bg-gray-50 dark:border-none dark:bg-gray-600/50'
			: 'dark:border-b border-black/30'}`}
		>

			<div className="flex gap-5 max-w-4xl m-auto items-start">

				<div className={`text-white p-1 rounded-sm ${message.author === 'me' ? 'bg-blue-900' : 'bg-gpt-green'}`}>
					{message.author === 'me' && <UserIcon width={20} height={20} />}
					{message.author === 'ai' && <GPTIcon width={20} height={20} />}
				</div>

				<div className="self-center w-full break-words whitespace-prewrap text-base">
					<p>{message.body}</p>
				</div>

			</div>

		</div>
	)
}