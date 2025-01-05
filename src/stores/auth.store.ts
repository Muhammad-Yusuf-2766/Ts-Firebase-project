import { create } from 'zustand'

type AuthState = 'login' | 'register'

interface IAuthStateStore {
	authstate: AuthState
	setAuth: (state: AuthState) => void
}

export const useAuthState = create<IAuthStateStore>(set => ({
	authstate: 'register',
	setAuth: state => set({ authstate: state }),
}))
