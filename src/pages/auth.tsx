import Login from '@/components/auth/login'
import Register from '@/components/auth/register'
import Social from '@/components/auth/social'
import { Card } from '@/components/ui/card'
import { useAuthState } from '@/stores/auth.store'

const Auth = () => {
	const { authstate } = useAuthState()

	return (
		<div className='w-full h-screen bg-gradient-to-t from-foreground to-background flex items-center justify-center'>
			<Card className='p-8 w-1/3 relative'>
				{authstate === 'login' && <Login />}
				{authstate === 'register' && <Register />}
				<Social />
			</Card>
		</div>
	)
}

export default Auth
