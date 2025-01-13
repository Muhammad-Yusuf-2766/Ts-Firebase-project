import { Route, Routes } from 'react-router-dom'
import Navbar from './components/shared/navbar'
import { Toaster } from './components/ui/sonner'
import Authentication from './pages/auth'
import Dashboard from './pages/dashboard'
import Home from './pages/home'

const App = () => {
	return (
		<div>
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/auth' element={<Authentication />} />
				<Route path='/dashboard' element={<Dashboard />} />
			</Routes>
			<Toaster position='bottom-center' />
		</div>
	)
}

export default App
