import Message from '@/types/Message'
import UserIcon from './icons/UserIcon'
import GPTIcon from './icons/GptIcon'

interface Props {
	message: Message
}

export default function ChatMessageItem({ message }: Props) {
	return (
		<div className={`py-7 px-4 text-white ${message.author === 'ai' && 'bg-gray-600/50'}`}>

			<div className="flex gap-5 max-w-4xl m-auto items-center ">

				<div 
					className={`w-10 h-10 flex justify-center items-center rounded
					${message.author === 'me' ? 'bg-blue-900' : 'bg-green-500/75'}`}
				>
					{message.author === 'me' && <UserIcon width={24} height={24} />}
					{message.author === 'ai' && <GPTIcon />}
				</div>

				<div className="flex-1 text-base whitespace-pre-wrap">
					<p>{message.body}</p>
				</div>

			</div>

		</div>
	)
}