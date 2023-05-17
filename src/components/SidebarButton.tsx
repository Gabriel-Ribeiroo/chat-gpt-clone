interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode
	icon?: React.ReactNode
}

export default function SidebarButton({ icon, children, ...rest }: Props) {
	return (
		<button 
			className="flex gap-2 items-center rounded-md text-sm p-3 
			cursor-pointer hover:bg-gray-500/20 w-full truncate"
			{...rest}
		>
			{icon} 
			{children}
		</button>
	)
}