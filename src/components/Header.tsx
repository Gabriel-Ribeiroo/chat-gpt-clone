import MenuIcon from './icons/MenuIcon'
import AddIcon from './icons/AddIcon'

interface Props {
	handleOpenSidebarClick: () => void 
	title?: string 
}

export default function Header({ handleOpenSidebarClick, title = 'Nova Conversa' }: Props) {
	return (
		<header 
			className="flex justify-between items-center w-full 
			border-b border-b-gray-600 p-2 md:hidden text-white"
		>
			<div onClick={handleOpenSidebarClick}>
				<MenuIcon width={24} height={24} />
			</div>

			<p className="mx-2 truncate">{title}</p>

			<div>
				<AddIcon width={24} height={24} />
			</div>
		</header>
	)
}