import './Authentication.css'
import { Background } from '../init_background/Background'
import { clsx } from 'clsx'
import { useEffect, useState } from 'react'
import { Buttons } from './components/Buttons'
import { Inputs } from './components/Inputs'

export const Authentication = () => {
	const [IsAnimationActive, changeIsAnimationActive] = useState(false)

	useEffect(() => {
		if (!IsAnimationActive) changeIsAnimationActive(true)
	}, [IsAnimationActive])

	return (
		<Background>
			<div className='auth_main text-white z-20 p-4 flex items-center'>
				<div className='relative inset-0 w-full h-5/6 '>
					<span
						className={clsx(
							'transitionGeneral text-3xl absolute top-0 inset-x-0 text-center',
							IsAnimationActive
								? 'opacity-100 translate-x-0'
								: 'opacity-0 translate-x-[-25%]'
						)}
					>
						Character Craft
					</span>
					<div className='absolute top-1/2 translate-y-[-60%]'>
						<Inputs IsAnimationActive={IsAnimationActive} />
					</div>
					<div
						className={clsx(
							'transitionGeneral absolute inline bottom-0 right-0',
							IsAnimationActive ? 'opacity-100' : 'opacity-0'
						)}
					>
						<Buttons />
					</div>
				</div>
			</div>
		</Background>
	)
}
