import clsx from 'clsx'
import { FC } from 'react'
import { InputBackgroundSVG } from '../../../assets/svg'
import { useTypedSelector } from '../../hooks/useTypedSelection'
import { useActions } from '../../hooks/useActions'

interface InputsProps {
	IsAnimationActive: boolean
}

export const Inputs: FC<InputsProps> = ({ IsAnimationActive }) => {
	const { error, password, username } = useTypedSelector(
		state => state.AuthReducer
	)
	const { AuthUpdateUsername, AuthUpdatePassword } = useActions()
	return (
		<>
			<div className='mb-2'>
				<span
					className={clsx(
						'transitionGeneral ml-4 mb-2 text-lg',
						IsAnimationActive ? 'opacity-100' : 'opacity-0'
					)}
				>
					Имя пользователя
				</span>
				<div
					className={clsx(
						'transitionGeneral relative overflow-hidden',
						IsAnimationActive ? 'w-full' : 'w-0'
					)}
				>
					<InputBackgroundSVG />
					<input
						className='absolute input inset-x-8 bottom-2 bg-transparent outline-none'
						placeholder='укажите имя пользователя...'
						onChange={e => {
							AuthUpdateUsername(e.target.value)
						}}
						value={username}
					/>
				</div>
				{error && <span className='errorText'>{error.error}</span>}
			</div>
			<div>
				<span
					className={clsx(
						'transitionGeneral ml-4 mb-2 text-lg',
						IsAnimationActive ? 'opacity-100' : 'opacity-0'
					)}
				>
					Пароль
				</span>
				<div
					className={clsx(
						'transitionGeneral relative overflow-hidden',
						IsAnimationActive ? 'w-full' : 'w-0'
					)}
				>
					<InputBackgroundSVG />
					<input
						className='absolute input inset-x-8 bottom-2 bg-transparent outline-none'
						placeholder='укажите пароль...'
						onChange={e => {
							AuthUpdatePassword(e.target.value)
						}}
						value={password}
					/>
				</div>
				{error && error.error.includes('password') && (
					<span className='errorText'>{error.error}</span>
				)}
			</div>
		</>
	)
}
