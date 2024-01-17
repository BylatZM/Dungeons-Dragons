import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Authentication } from './components/authentication/Authentication'
import { Loading } from './components/loading/Loading'

function App() {
	return (
		<div className='w-full min-h-screen'>
			<Routes>
				<Route path='/' element={<Authentication />} />
				<Route path='/loading' element={<Loading />} />
			</Routes>
		</div>
	)
}

export default App
