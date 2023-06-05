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
			className={`${extraStyles} p-3.5 border border-white/20 cursor-pointer
			rounded-md text-white hover:bg-gray-500/20 hidden md:block`}		
		>
			<SidebarIcon />
		</button>
	)

}