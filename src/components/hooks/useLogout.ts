import { useActions } from './useActions'
import { useNavigate } from 'react-router-dom'

export const useLogout = () => {
	const navigate = useNavigate()
	const { AuthClear, CharacterClear } = useActions()

	const logout = () => {
		AuthClear()
		CharacterClear()
		localStorage.clear()
		navigate('/')
	}

	return logout
}
