import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { Authentication } from './components/authentication/Authentication'
import { Account } from './components/personal_account/Account'
import RequireAuth from './components/RequireAuth'
import { useEffect } from 'react'

function App() {
	const navigate = useNavigate()
	useEffect(() => {
		if (localStorage) navigate('/account')
	}, [])
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
