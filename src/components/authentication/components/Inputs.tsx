import clsx from 'clsx'
import { FC } from 'react'
import { InputBackgroundSVG } from '../../../assets/svg'
import { useTypedSelector } from '../../hooks/useTypedSelection'
import { useActions } from '../../hooks/useActions'

interface InputsProps {
	IsAnimationActive: boolean
}

export const Inputs: FC<InputsProps> = ({ IsAnimationActive }) => {
	const { errors, email, password } = useTypedSelector(
		state => state.AuthReducer
	)
	const { AuthEmail, AuthPassword, AuthError } = useActions()
	return (
		<>
			<div className='mb-2'>
				<span
					className={clsx(
						'transitionGeneral ml-4 mb-2 text-lg',
						IsAnimationActive ? 'opacity-100' : 'opacity-0'
					)}
				>
					Почта
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
						placeholder='укажите почту...'
						onChange={e => {
							if (errors) AuthError(errors.filter(el => el.type !== 'login'))
							AuthEmail(e.target.value)
						}}
						value={email}
					/>
				</div>
				{errors.some(el => el.type === 'login') && (
					<span className='errorText'>
						{errors.filter(el => el.type === 'login')[0].error}
					</span>
				)}
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
							if (errors) AuthError(errors.filter(el => el.type !== 'password'))
							AuthPassword(e.target.value)
						}}
						value={password}
					/>
				</div>
				{errors.some(el => el.type === 'password') && (
					<span className='errorText'>
						{errors.filter(el => el.type === 'password')[0].error}
					</span>
				)}
			</div>
		</>
	)
}
