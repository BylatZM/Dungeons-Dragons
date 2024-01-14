import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelection'
import { ButtonContent } from './ButtonContent'

export const Buttons = () => {
	const { AuthLoading, AuthError } = useActions()
	const { loading } = useTypedSelector(state => state.AuthReducer)

	const authRequest = () => {
		AuthLoading('auth')
		setTimeout(() => {
			AuthError([
				{
					type: 'login',
					error: 'Не верно указана почта'
				},
				{
					type: 'password',
					error: 'Не верно указан пароль'
				}
			])
			AuthLoading('')
		}, 4000)
	}

	const regRequest = () => {
		AuthLoading('reg')
		setTimeout(() => {
			AuthError([
				{
					type: 'login',
					error: 'Не верно указана почта'
				},
				{
					type: 'password',
					error: 'Не верно указан пароль'
				}
			])
			AuthLoading('')
		}, 4000)
	}
	return (
		<>
			<button
				className='button inline-block relative w-[180px] h-[40px]'
				onClick={authRequest}
			>
				<div className='absolute inset-0 w-full h-full'>
					<ButtonContent
						text='Войти'
						color='#3b82f6'
						isLoading={loading === 'auth' ? true : false}
					/>
				</div>
				<div className='transitionGeneral absolute  inset-0 w-full h-full passive'>
					<ButtonContent
						text='Войти'
						color='#fff'
						isLoading={loading === 'auth' ? true : false}
					/>
				</div>
			</button>
			<button
				className='button inline-block relative w-[180px] h-[40px] ml-4'
				onClick={regRequest}
			>
				<div className='absolute inset-0 w-full h-full'>
					<ButtonContent
						text='Зарегистрироваться'
						color='#3b82f6'
						isLoading={loading === 'reg' ? true : false}
					/>
				</div>
				<div className='transitionGeneral absolute inset-0 w-full h-full passive'>
					<ButtonContent
						text='Зарегистрироваться'
						color='#fff'
						isLoading={loading === 'reg' ? true : false}
					/>
				</div>
			</button>
		</>
	)
}