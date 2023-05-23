import ChatInput from './chat/ChatInput'

export default function Footer() {
	return (
		<footer className="p-2 border-t border-t-white/20 md:border-none">
			<div className="max-w-3xl m-auto">
				<ChatInput  />

				<p className="text-xs text-center text-white/50 m-2"> 
					Free Research Preview. ChatGPT may produce inaccurate information about people, places, or facts. 
					
					<a 
						href="https://help.openai.com/en/articles/6825453-chatgpt-release-notes"
						target="_blank"
						className="underline ml-1"
					> 
					  ChatGPT May 12 Version
					</a>
				</p>

			</div>
		</footer>
	)
}