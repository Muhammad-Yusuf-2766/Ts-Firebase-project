import { auth } from '@/firebase'
import { useUserState } from '@/stores/user.auth.store'
import { ReactNode, useEffect, useState } from 'react'
import FillLoading from '../shared/fill-laoding'

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const { setUser } = useUserState()
	const [isLoading, setIsloading] = useState(true)

	useEffect(() => {
		auth.onAuthStateChanged(user => {
			if (user) {
				setUser(user)
			}
			setIsloading(false)
		})
	}, [])
	return isLoading ? <FillLoading /> : <>{children}</>
}

export default AuthProvider
