import { Routes, Route } from 'react-router-dom'
import { Authentication } from './components/authentication/Authentication'
import { Loading } from './components/loading/Loading'
import { Account } from './components/personal_account/Account'
import { CharacterSetting } from './components/character_settings/CharacterSetting'

function App() {
	return (
		<div className='w-full min-h-screen'>
			<Routes>
				<Route path='/' element={<Authentication />} />
				<Route path='/loading' element={<Loading />} />
				<Route path='/account' element={<Account />} />
				<Route path='/character_settings' element={<CharacterSetting />} />
			</Routes>
		</div>
	)
}

export default App
