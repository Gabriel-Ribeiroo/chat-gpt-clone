import { create } from 'zustand'

import Chat from '@/types/Chat'

import { v4 as uuidv4 } from 'uuid'

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
	getAiResponse: () => void 
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
				chats: state.chats.map(chat => chat.id === currentChatId
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

	getAiResponse: () => {
		const currentChatId = useChat.getState().currentChatId
		
		setTimeout(() => {
			set((state) => ({
				chats: state.chats.map(chat => chat.id === currentChatId
					? { ...chat, messages: [
							...chat.messages,
							{
								id: uuidv4(),
								author: 'ai',
								body: 'Olá! Como posso ajudar?'
							}
					]}
					: chat 	
				),

				aiLoading: false 
			}))
		}, 1000)
	}
}))

export default useChat