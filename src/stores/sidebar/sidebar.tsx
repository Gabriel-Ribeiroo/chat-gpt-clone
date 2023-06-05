import { create } from 'zustand'

interface State {
	isOpened: {  
		mobile: boolean 
		desktop: boolean 
	}
}

interface Action {
	toggleSidebar: () => void 
}

const useSidebar = create<State & Action>(set => ({
	isOpened: {
		mobile: false, 
		desktop: true
	},

	toggleSidebar: () => {
		set(({ isOpened }) => ({
			isOpened: {
				mobile: !isOpened.mobile,
				desktop: !isOpened.desktop
			}
		}))
	}
}))

export default useSidebar 