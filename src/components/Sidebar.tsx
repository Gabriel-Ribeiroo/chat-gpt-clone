import SidebarButton from './SidebarButton'
import CloseIcon from './icons/CloseIcon'
import AddIcon from './icons/AddIcon'
import TrashIcon from './icons/TrashIcon'

interface Props {
	children: React.ReactNode
	isOpened: boolean 
	handleCloseSidebarClick: () => void 
}

export default function Sidebar({ isOpened, handleCloseSidebarClick, children }: Props) {
	return (
		<aside 
			className={`fixed top-0 bottom-0 left-0 text-white md:w-64 md:static 
			${isOpened ? 'w-screen bg-gray-600/75' : 'w-0'}`}
		>

			<div 
				className={`flex w-full transition-all duration-300 h-screen
				${isOpened ? 'ml-0' : '-ml-96'} md:ml-0`}
			>

				<div className="flex flex-col w-64 bg-gray-900 p-3">
					
					<div 
						className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-500/20 
						rounded-md border border-white/20 text-sm transition-all duration-200"
					>
						<AddIcon width={20} height={20} />
						<p>Nova Conversa</p>
					</div>

					<nav className="flex-1 mt-2 overflow-y-auto">
						{children}
					</nav>

					<div className="pt-2 border-t border-gray-700">
						
						<div className="flex justify-center">
							<SidebarButton icon={<TrashIcon />} aria-label="Deletar Conversas">
								Limpar todas as Conversas
							</SidebarButton>
						</div>

					</div>

				</div>

				<div 
					className="flex justify-center items-center w-10 h-10 cursor-pointer md:hidden"
					onClick={handleCloseSidebarClick}
				>
					<CloseIcon width={24} height={24} />
				</div>
			
			</div>
		
		</aside>
	)
}