import { Outlet, useLocation, Navigate } from 'react-router-dom'
import { useTypedSelector } from '../../components/hooks/useTypedSelection'
import { useActions } from '../../components/hooks/useActions'

const RequireAuth: React.FC = () => {
	const { AuthSaveToken } = useActions()
	const store_token = useTypedSelector(state => state.Auth.token)
	const { pathname } = useLocation()
	const local_token = localStorage.getItem('token')

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
