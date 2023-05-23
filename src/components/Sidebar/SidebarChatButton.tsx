import { useState } from 'react'

import Chat from '@/types/Chat'
import ChatIcon from '../icons/ChatIcon'
import TrashIcon from '../icons/TrashIcon'
import EditIcon from '../icons/EditIcon'
import CloseIcon from '../icons/CloseIcon'
import CheckIcon from '../icons/CheckIcon'

import useChat from '@/stores/chat/chat'

interface Props {
	active: boolean
	chat: Chat
}

export default function SidebarChatButton({ active, chat }: Props) {
	const [deleting, setDeleting] = useState(false)
	const [editing, setEditing] = useState(false)
	const [titleInput, setTitleInput] = useState(chat.title)

	const [removeCurrentChat, changeCurrentChat, changeCurrentChatTitle] = useChat(state => 
		[state.removeCurrentChat, state.changeCurrentChat, state.changeCurrentChatTitle]
	)

	const handleTitleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitleInput(event.target.value)
	}

	const handleCancelButtonClick = () => {
		if (editing) 
			return setEditing(false)

		setDeleting(false)
	} 

	const handleConfirmButtonClick = () => {
		if (deleting)
			return removeCurrentChat() 

		if (titleInput.trim() && titleInput !== chat.title)
			changeCurrentChatTitle(titleInput.trim())
		
		setEditing(false)
	}

	const handleInputEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.code.toLowerCase() === 'enter' && !event.shiftKey) {
			if (titleInput.trim() && titleInput !== chat.title) {
				changeCurrentChatTitle(titleInput)
			}	

			setEditing(false)
		}
	}

	return (
		<div 
			onClick={() => changeCurrentChat(chat.id)}
			className={`flex items-center gap-3 p-3 text-sm rounded-md cursor-pointer
			${active ? 'bg-gray-500/20' : 'hover:bg-gray-500/10'}`}
		>

			<div>
				{!deleting && <ChatIcon width={15} height={15} />}

				{deleting && <TrashIcon width={15} height={15} />}
			</div>

			<div className="flex-1 overflow-x-hidden">
				
				{editing && 
					<input 
						className="text-sm bg-transparent w-full outline-none border border-blue-500"
						type="text"
						onKeyDown={handleInputEnter}
						value={titleInput} 
						onChange={handleTitleInputChange} 
					/>
				}

				{!editing && 
					<div className="border border-transparent">
						{!deleting && <p>{chat.title}</p>}
						
						{deleting && <p>Delete "{chat.title}"</p>}
					</div>
				}

			</div>

			<div>
				{active && !deleting && !editing && 
					<div className="flex gap-2">
						
						<div 
							onClick={() => setEditing(true)}
							className="opacity-80 hover:opacity-100 cursor-pointer"
						>
							<EditIcon width={16} height={16} />
						</div>

						<div 
							onClick={() => setDeleting(true)}  
							className="opacity-80 hover:opacity-100 cursor-pointer"
						>
							<TrashIcon width={16} height={16} />
						</div>

					</div>	
				}

				{active && (deleting || editing) && 
					<div className="flex gap-2">

						<button onClick={handleConfirmButtonClick} className="opacity-80 hover:opacity-100 cursor-pointer">
							<CheckIcon width={16} height={16} />
						</button>

						<button onClick={handleCancelButtonClick} className="opacity-80 hover:opacity-100 cursor-pointer">
							<CloseIcon width={16} height={16} />
						</button>

					</div>
				}
			</div>
		</div>
	)	
}