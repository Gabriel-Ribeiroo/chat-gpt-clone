export default function SidebarIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg 
			stroke="currentColor" 
			fill="none" 
			strokeWidth="2" 
			viewBox="0 0 24 24" 
			strokeLinecap="round" 
			strokeLinejoin="round" 
			className="h-4 w-4" 
			{...props}
		>
			<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
			<line x1="9" y1="3" x2="9" y2="21"></line>
	</svg>
	)
}