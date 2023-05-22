import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai'

import Message from '@/types/Message'

const config = new Configuration({
	apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
}) 

const api = new OpenAIApi(config)

export const openai = {
	generate: async (messages: ChatCompletionRequestMessage[]) => {
		try {
			const response = await api.createChatCompletion({
				model: 'gpt-3.5-turbo',
				temperature: 0.6,
				messages 
			})
			
			return response.data.choices[0]?.message?.content
		} catch {
			return undefined 
		}
	},

	translateMessages: (messages: Message[]) => {
		const reqMessage: ChatCompletionRequestMessage[] = []

		messages.forEach(message => {
			reqMessage.push({
				role: message.author === 'me' ? 'user' : 'assistant',
				content: message.body
			})
		})

		return reqMessage
	}
}