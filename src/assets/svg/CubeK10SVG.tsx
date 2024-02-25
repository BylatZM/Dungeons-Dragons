import { FC } from 'react'
import { ICube } from '../../types'
import clsx from 'clsx'

interface IProps {
	clicksNumber: ICube
	changeClicksNumber: React.Dispatch<React.SetStateAction<ICube>>
}

export const CubeK10SVG: FC<IProps> = ({
	clicksNumber,
	changeClicksNumber
}) => {
	return (
		<button
			className='relative min-w-[70px] h-[70px] rounded-full bg-black flex justify-center items-center'
			onClick={() =>
				changeClicksNumber(prev => ({ ...prev, K10: prev.K10 + 1 }))
			}
		>
			<div
				className={clsx(
					'transitionFast absolute flex justify-center items-center bottom-2 left-[-10px] bg-black w-[25px] h-[25px] text-white font-bold border-solid border-white border-[1px] rounded-full',
					clicksNumber.K10 === 0 ? 'opacity-0' : 'opacity-100'
				)}
			>
				{clicksNumber.K10}
			</div>
			<div className='flex flex-col items-center gap-y-1'>
				<svg
					width='32'
					height='34'
					viewBox='0 0 32 34'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M15.8584 1.41675L30.7334 16.791M15.8584 1.41675L0.983398 16.791M15.8584 1.41675L23.0949 15.7121M15.8584 1.41675L8.62191 15.7121M30.7334 16.791L15.8584 32.3001M30.7334 16.791L23.0949 15.7121M0.983398 16.791L15.8584 32.3001M0.983398 16.791L8.62191 15.7121M23.0949 15.7121L15.8584 19.2185M8.62191 15.7121L15.8584 19.2185M15.8584 32.3001V19.2185'
						stroke='white'
					/>
				</svg>
				<span className='text-xs text-white'>K8</span>
			</div>
		</button>
	)
}
