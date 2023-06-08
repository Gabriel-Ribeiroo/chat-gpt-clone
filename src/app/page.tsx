import SunIcon from '@/components/icons/SunIcon'
import ThunderIcon from '@/components/icons/ThunderIcon'
import DangerIcon from '@/components/icons/DangerIcon'

export default function Home() {
	return (
		<main className="flex flex-1 justify-center md:items-center overflow-auto">
			<div className="p-5 pb-0 text-white">
				<h1 className="text-4xl font-bold text-center my-8">ChatGPT</h1>

				<div className="flex flex-col md:flex-row gap-5 md:mb-8 md:max-w-4xl">

					<div className="flex flex-1 flex-col gap-5">

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

					<div className="flex flex-1 flex-col gap-5">

						<div className="flex gap-5 justify-center items-center md:flex-col md:gap-3">
							<ThunderIcon />
							<p>Capacidades</p>
						</div>

						<div className="bg-white/5 rounded p-3 text-center text-sm">
							<p>"Lembrar oque o usuário disse mais cedo"</p>
						</div>
						
						<div className="bg-white/5 rounded p-3 text-center text-sm">
							<p>"Permite que o usuário providencie correções"</p>
						</div>

						<div className="bg-white/5 rounded p-3 text-center text-sm">
							<p>"Treinado para ignorar perguntas inapropriadas"</p>
						</div>

					</div>

					<div className="flex flex-1 flex-col gap-5">

						<div className="flex gap-5 justify-center items-center md:flex-col md:gap-3">
							<DangerIcon />
							<p>Limitações</p>
						</div>

						<div className="bg-white/5 rounded p-3 text-center text-sm">
							<p>"Pode ocasionalmente gerar respostas incorretas"</p>
						</div>
						
						<div className="bg-white/5 rounded p-3 text-center text-sm">
							<p>"Pode ocasionalmente dar instruções prejudiciais ou conteúdo tendencioso"</p>
						</div>

						<div className="bg-white/5 rounded p-3 mb-5 text-center text-sm word-wrap">
							<p>"Conhecimento de mundo e eventos limitados apos 2021"</p>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}