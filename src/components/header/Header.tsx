import { CharacterSVG } from '../../assets/svg'
import { clsx } from 'clsx'
import { useState } from 'react'
import { ButtonSkeleton } from '../personal_account/components/ButtonSkeleton'
import { useNavigate } from 'react-router-dom'

export const Header = () => {
	const navigate = useNavigate()
	const [isMenuActive, changeIsMenuActive] = useState(false)
	return (
		<>
			<div className='flex fixed inset-x-0 top-0 justify-between bg-main w-full px-20 py-5 z-[15] border-0 border-b-2 border-b-white'>
				<span className='text-4xl text-white'>Character Forge</span>
				<button
					className='relative bg-none outline-none border-none button w-[40px] rounded-full overflow-hidden'
					onClick={() => changeIsMenuActive(prev => !prev)}
				>
					<div className='absolute inset-0 w-full h-full'>
						<CharacterSVG color='#3b82f6' dimension='40' />
					</div>
					<div className='transitionGeneral absolute  inset-0 w-full h-full passive'>
						<CharacterSVG color='#dadada' dimension='40' />
					</div>
				</button>
			</div>
			<div
				className={clsx(
					'transitionGeneral fixed right-20 top-20 w-min overflow-hidden z-10 backdrop-blur-md',
					isMenuActive ? 'h-[40px]' : 'h-0'
				)}
			>
				<button
					className='relative bg-none border-none outline-none w-[180px] h-[40px]'
					onClick={() => navigate('/')}
				>
					<div className='transitionGeneral absolute  inset-0 w-full h-full'>
						<ButtonSkeleton text='Выйти' color='#fff' />
					</div>
				</button>
			</div>
		</>
	)
}
