'use client'

import SidebarIcon from '../icons/SidebarIcon'

import useSidebar from '@/stores/sidebar/sidebar'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	extraStyles?: string 
}

export default function ToggleSidebarButton({ extraStyles, ...rest }: Props) {
	const toggleSidebar = useSidebar(state => state.toggleSidebar)

	return (
		<button
			{ ...rest }
			onClick={toggleSidebar}
			className={`p-3.5 border dark:border-white/20 dark:text-white cursor-pointer rounded-md
		 	hover:bg-gray-500/20 dark:hover:bg-gray-500/20 hidden md:block ${extraStyles}`}		
		>
			<SidebarIcon />
		</button>
	)

}