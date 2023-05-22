import { create } from 'zustand'

import { v4 as uuidv4 } from 'uuid'

import Chat from '@/types/Chat'
import Message from '@/types/Message'
import { openai } from '@/utils/openai'

export interface State {
	chats: Chat[]
	currentChatId: string
	aiLoading: boolean 
}

export interface Actions {
	changeCurrentChatTitle: (newTitle: string) => void
	sendMessage: (newMessage: string) => void
	changeCurrentChat: (id: string) => void  
	createNewChat: () => void 
	removeAllChats: () => void
	removeCurrentChat: () => void 
	getAiResponse: (messages: Message[]) => Promise<void> 
}

const useChat = create<State & Actions>(set => ({
	chats: [],
	currentChatId: '',
	aiLoading: false, 

	createNewChat: () => {
		const aiLoading = useChat.getState().aiLoading
		
		if (!aiLoading)
			set(() => ({ currentChatId: '' }))
	},

	removeAllChats: () => {
		const aiLoading = useChat.getState().aiLoading

		if (!aiLoading) 
			set(() => ({ chats: [], currentChatId: '' }))
	},

	removeCurrentChat: () => {
		const aiLoading = useChat.getState().aiLoading

		if (!aiLoading) 
			set(state => ({
				chats: state.chats.filter(chat => chat.id !== state.currentChatId),
				currentChatId: ''
			}))
	},

	changeCurrentChat: (id: string) => {
		const aiLoading = useChat.getState().aiLoading
		const currentChatId = useChat.getState().currentChatId
		
		if (id !== currentChatId && !aiLoading) 
			set(() => ({ currentChatId: id }))
	},

	changeCurrentChatTitle: (newTitle: string) => {
		set(state => ({
			chats: state.chats.map(chat => chat.id === state.currentChatId 
				? { ...chat, title: newTitle }
				: chat 
			)
		}))
	},

	sendMessage: (newMessage: string) => {
		const currentChatId = useChat.getState().currentChatId

		if (!currentChatId) {
			const newChatId = uuidv4()

			set(state => ({
				chats: [{
					id: newChatId,
					title: newMessage,
					messages: [{ id: uuidv4(), author: 'me', body: newMessage }]
				}, ...state.chats],

				currentChatId: newChatId,
				aiLoading: true
			}))
		}

		else {
			set(state => ({
				chats: state.chats.map(chat => chat.id === state.currentChatId
					? { ...chat, messages: [...chat.messages, {
						id: uuidv4(),
						author: 'me',
						body: newMessage
					}]}	
					: chat
				),

				aiLoading: true
			}))
		}
	},

	getAiResponse: async (messages: Message[]) => {
		try {
			const translatedMessages = openai.translateMessages(messages)
		
			const response = await openai.generate(translatedMessages)

			set(state => ({
				chats: state.chats.map(chat => chat.id === state.currentChatId
					? { ...chat, messages: [...chat.messages, {
						id: uuidv4(),
						author: 'ai',
						body: response!
					}]}	
					: chat
				),

				aiLoading: false 
			}))
		} catch {
			return undefined
		}
	}		
}))

export default useChat