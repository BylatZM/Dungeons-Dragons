import { useSigninMutation } from '../../../store/api/endpoints/authApiSlice'
import { useSignupMutation } from '../../../store/api/endpoints/regApiSlice'
import { useTypedSelector } from '../../hooks/useTypedSelection'
import { ButtonContent } from './ButtonContent'

export const Buttons = () => {
	const { username, password } = useTypedSelector(state => state.AuthReducer)
	const [signin, { isLoading: isAuthLoading, data: authSuccessResponse }] =
		useSigninMutation()
	const [
		signup,
		{
			isLoading: isRegLoading,
			error: regErrorResponse,
			data: regSuccessResponse
		}
	] = useSignupMutation()

	const makeAuthRequest = async () => {
		await signin({ username: username, password: password })
		if (authSuccessResponse) console.log(authSuccessResponse)
	}

	const makeRegRequest = async () => {
		await signup({ username: username, password: password })
		if (regErrorResponse) console.log(regErrorResponse)
		if (regSuccessResponse) console.log(regSuccessResponse)
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
