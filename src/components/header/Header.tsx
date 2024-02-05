import { CharacterSVG } from '../../assets/svg'
import { clsx } from 'clsx'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Header = () => {
	const navigate = useNavigate()
	const [isMenuActive, changeIsMenuActive] = useState(false)
	return (
		<>
			<div className='fixed inset-x-0 top-0 bg-main w-full border-0 border-b-2 border-b-white flex justify-center z-[15]'>
				<div className='flex justify-between min-w-[1400px] max-w-[1400px] py-3'>
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
			</div>
			<div
				className={clsx(
					'transitionFast fixed right-[67px] top-[66px] w-[210px] overflow-hidden z-10 bg-main text-white rounded-md flex flex-col items-center',
					isMenuActive ? 'h-[80px] p-[10px]' : 'h-0 p-0'
				)}
			>
				<button
					className='bg-inherit border-white border-2 rounded-md outline-none w-[180px] h-[40px]'
					onClick={() => navigate('/')}
				>
					Выйти
				</button>
			</div>
		</>
	)
}
