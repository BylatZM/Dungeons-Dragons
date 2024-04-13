import { Outlet, useLocation, Navigate } from 'react-router-dom'
import { useTypedSelector } from './hooks/useTypedSelection'
import { useActions } from './hooks/useActions'
import { useLogout } from './hooks/useLogout'

const RequireAuth: React.FC = () => {
	const { AuthSaveToken } = useActions()
	const logout = useLogout()
	const store_token = useTypedSelector(state => state.Auth.token)
	const { sessionStatus } = useTypedSelector(state => state.Auth)
	const { pathname } = useLocation()
	const local_token = localStorage.getItem('token')

	if (sessionStatus === 'expired') logout()

	if (!store_token && local_token) {
		AuthSaveToken(local_token)
	}

	return pathname.includes('/account') && local_token ? (
		<Outlet />
	) : (
		<Navigate to={'/'} />
	)
}

export default RequireAuth
