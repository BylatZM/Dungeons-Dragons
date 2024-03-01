import {
	useSigninMutation,
	useSignupMutation
} from '../../../store/api/authApiSlice'
import { useTypedSelector } from '../../hooks/useTypedSelection'
import { ButtonContent } from './ButtonContent'
import { useActions } from '../../hooks/useActions'
import { useNavigate } from 'react-router-dom'

export const Buttons = () => {
	const { AuthUpdateError, AuthSaveApiResponse } = useActions()
	const { username, password } = useTypedSelector(state => state.Auth)
	const navigate = useNavigate()
	const [signin, { isLoading: isAuthLoading }] = useSigninMutation()
	const [signup, { isLoading: isRegLoading }] = useSignupMutation()

	const makeAuthRequest = async () => {
		AuthUpdateError(null)
		try {
			const response = await signin({
				username: username,
				password: password
			}).unwrap()
			if (response) {
				localStorage.setItem('token', response.token)
				AuthSaveApiResponse(response)
				navigate('/account')
			}
		} catch (e: any) {
			AuthUpdateError({ error: 'the username or password is incorrect' })
		}
	}

	const makeRegRequest = async () => {
		AuthUpdateError(null)
		try {
			const response = await signup({
				username: username,
				password: password
			}).unwrap()
			if ('message' in response) alert(response.message)
		} catch (e: any) {
			if (e && e.data && 'error' in e.data) AuthUpdateError(e.data)
		}
	}

	return (
		<>
			<button
				className='button inline-block relative w-[180px] h-[40px]'
				onClick={makeAuthRequest}
			>
				<div className='absolute inset-0 w-full h-full'>
					<ButtonContent
						text='Войти'
						color='#3b82f6'
						isLoading={isAuthLoading}
					/>
				</div>
				<div className='transitionGeneral absolute  inset-0 w-full h-full passive'>
					<ButtonContent text='Войти' color='#fff' isLoading={isAuthLoading} />
				</div>
			</button>
			<button
				className='button inline-block relative w-[180px] h-[40px] ml-4'
				onClick={makeRegRequest}
			>
				<div className='absolute inset-0 w-full h-full'>
					<ButtonContent
						text='Зарегистрироваться'
						color='#3b82f6'
						isLoading={isRegLoading}
					/>
				</div>
				<div className='transitionGeneral absolute inset-0 w-full h-full passive'>
					<ButtonContent
						text='Зарегистрироваться'
						color='#fff'
						isLoading={isRegLoading}
					/>
				</div>
			</button>
		</>
	)
}
