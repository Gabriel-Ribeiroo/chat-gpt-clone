import { State, Actions } from './chat'

export const selectCurrentChat = (state: State & Actions) => {
	return state.chats.find(chat => chat.id === state.currentChatId)
}