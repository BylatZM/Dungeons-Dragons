import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Authentication } from './components/authentication/Authentication'

function App() {
	return (
		<div className='w-full min-h-screen'>
			<Routes>
				<Route path='/' element={<Authentication />} />
				<Route element={<div></div>} />
			</Routes>
		</div>
	)
}

export default App
