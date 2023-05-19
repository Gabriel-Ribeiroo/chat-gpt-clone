import SunIcon from './icons/SunIcon'
import ThunderIcon from './icons/ThunderIcon'
import DangerIcon from './icons/DangerIcon'

export default function ChatPlaceholder() {
	return (
		<div className="m-5 text-white">
			<h1 className="text-4xl font-bold text-center my-8">ChatGPT</h1>

			<div className="flex flex-col md:flex-row gap-5 mb-8 m-auto md:max-w-4xl">

				<div className="flex flex-col gap-5">

					<div className="flex gap-5 justify-center items-center md:flex-col md:gap-3">
						<SunIcon width={24} height={24} />
						<p>Exemplo</p>
					</div>

					<div className="bg-white/5 rounded p-3 text-center text-sm">
						<p>"Explique o sentido da vida em termos simples"</p>
					</div>
					
					<div className="bg-white/5 rounded p-3 text-center text-sm">
						<p>"Me de ideias criativas para um aniversário de 10 anos"</p>
					</div>

					<div className="bg-white/5 rounded p-3 text-center text-sm">
						<p>"Como eu faço uma requisição HTTP em JavaScript?"</p>
					</div>

				</div>

				<div className="flex flex-col gap-5">

					<div className="flex gap-5 justify-center items-center md:flex-col md:gap-3">
						<ThunderIcon />
						<p>Capacidades</p>
					</div>

					<div className="bg-white/5 rounded p-3 text-center text-sm">
						<p>"Explique o sentido da vida em termos simples"</p>
					</div>
					
					<div className="bg-white/5 rounded p-3 text-center text-sm">
						<p>"Me de ideias criativas para um aniversário de 10 anos"</p>
					</div>

					<div className="bg-white/5 rounded p-3 text-center text-sm">
						<p>"Como eu faço uma requisição HTTP em JavaScript?"</p>
					</div>

				</div>

				<div className="flex flex-col gap-5">

					<div className="flex gap-5 justify-center items-center md:flex-col md:gap-3">
						<DangerIcon />
						<p>Limitações</p>
					</div>

					<div className="bg-white/5 rounded p-3 text-center text-sm">
						<p>"Explique o sentido da vida em termos simples"</p>
					</div>
					
					<div className="bg-white/5 rounded p-3 text-center text-sm">
						<p>"Me de ideias criativas para um aniversário de 10 anos"</p>
					</div>

					<div className="bg-white/5 rounded p-3 text-center text-sm">
						<p>"Como eu faço uma requisição HTTP em JavaScript?"</p>
					</div>

				</div>

			</div>
		</div>
	)
}