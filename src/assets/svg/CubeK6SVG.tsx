import { FC } from 'react'
import { ICube } from '../../types/StatesTypes'
import clsx from 'clsx'

interface IProps {
	clicksNumber: ICube
	changeClicksNumber: React.Dispatch<React.SetStateAction<ICube>>
}

export const CubeK6SVG: FC<IProps> = ({ clicksNumber, changeClicksNumber }) => {
	return (
		<button
			className='relative min-w-[70px] h-[70px] rounded-full bg-black flex justify-center items-center'
			onClick={() => changeClicksNumber(prev => ({ ...prev, K6: prev.K6 + 1 }))}
		>
			<div
				className={clsx(
					'transitionFast absolute flex justify-center items-center bottom-2 left-[-10px] bg-black w-[25px] h-[25px] text-white font-bold border-solid border-white border-[1px] rounded-full',
					clicksNumber.K6 === 0 ? 'opacity-0' : 'opacity-100'
				)}
			>
				{clicksNumber.K6}
			</div>
			<div className='flex flex-col items-center gap-y-1'>
				<svg
					width='29'
					height='32'
					viewBox='0 0 29 32'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M27.6002 8.3527L14.1419 0.699951L0.683594 8.3527M27.6002 8.3527V23.1468L14.1419 31.0166M27.6002 8.3527L14.1419 16.447M0.683594 8.3527V23.1468L14.1419 31.0166M0.683594 8.3527L14.1419 16.447M14.1419 31.0166V16.447'
						stroke='white'
					/>
				</svg>
				<span className='text-xs text-white'>K6</span>
			</div>
		</button>
	)
}
