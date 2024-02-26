import { useActions } from './useActions'
import { useNavigate } from 'react-router-dom'

export const useLogout = () => {
	const navigate = useNavigate()
	const { AuthClear } = useActions()

	const logout = () => {
		AuthClear()
		localStorage.clear()
		navigate('/')
	}

	return logout
}
