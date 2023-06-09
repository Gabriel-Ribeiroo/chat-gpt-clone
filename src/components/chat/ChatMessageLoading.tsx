import GPTIcon from '../icons/GptIcon'

export default function ChatMessageLoading() {
	return (
		<div className="py-7 px-4 bg-gray-50 border border-black/10 dark:border-none last:dark:bg-gray-600/50">

			<div className="max-w-4xl flex items-center gap-5 m-auto">

				<div className="p-1 rounded-sm bg-gpt-green text-white">
					<GPTIcon width={20} height={20} />
				</div>

				<div className="w-2 h-4 bg-slate-400 animate-blink"></div>
			</div>

		</div>
	)
}