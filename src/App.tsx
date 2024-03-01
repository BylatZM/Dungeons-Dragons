import { Routes, Route, Navigate } from 'react-router-dom'
import { Authentication } from './components/authentication/Authentication'
import { Account } from './components/personal_account/Account'
import RequireAuth from './store/api/RequireAuth'

function App() {
	return (
		<div className='w-full min-h-screen'>
			<Routes>
				<Route path='/' element={<Authentication />} />
				<Route element={<RequireAuth />}>
					<Route path='/account/*' element={<Account />} />
				</Route>
				<Route path='*' element={<Navigate to={'/'} />} />
			</Routes>
		</div>
	)
}

export default App
