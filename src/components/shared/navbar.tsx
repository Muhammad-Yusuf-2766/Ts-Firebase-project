import { navLinks } from '@/constants'
import { Link, NavLink } from 'react-router-dom'
import { useUserState } from '../../stores/user.auth.store'
import { Button } from '../ui/button'
import { ModeToggle } from './mode.toggle'
import UserBox from './userBox'

const Navbar = () => {
	const { user } = useUserState()

	return (
		<div className='w-full h-[10vh] border-b inset-0 z-50 bg-background'>
			<div className='container max-w-6xl mx-auto h-full flex justify-between items-center'>
				<Link to={'/'} className='text-2xl font-bold uppercase'>
					workout{' '}
				</Link>
				<div className='flex items-center gap-3'>
					{navLinks.map(nav => (
						<NavLink
							className='font-medium hover:underline'
							key={nav.path}
							to={nav.path}
						>
							{nav.label}
						</NavLink>
					))}
					<ModeToggle />
					{user ? (
						<UserBox />
					) : (
						<Link to={'/auth'}>
							<Button variant={'secondary'} size={'lg'}>
								Join free
							</Button>
						</Link>
					)}
				</div>
			</div>
		</div>
	)
}

export default Navbar
