import { create } from 'zustand'

interface State {
	isOpened: {  
		mobile: boolean 
		desktop: boolean 
	}
}

interface Action {
	openSidebar: () => void 
	closeSidebar: () => void 
}

const useSidebar = create<State & Action>(set => ({
	isOpened: {
		mobile: false, 
		desktop: true
	},

	openSidebar: () => {
		set(state => ({
			isOpened: { mobile: true, desktop: true }			
		}))
	},

	closeSidebar: () => {
		set({ isOpened: { mobile: false, desktop: false } })		
	}
}))

export default useSidebar 