import { FC } from 'react'
import { ICube } from '../../types/StatesTypes'
import clsx from 'clsx'

interface IProps {
	clicksNumber: ICube
	changeClicksNumber: React.Dispatch<React.SetStateAction<ICube>>
}

export const CubeK12SVG: FC<IProps> = ({
	clicksNumber,
	changeClicksNumber
}) => {
	return (
		<button
			className='relative min-w-[70px] h-[70px] rounded-full bg-black flex justify-center items-center'
			onClick={() =>
				changeClicksNumber(prev => ({ ...prev, K12: prev.K12 + 1 }))
			}
		>
			<div
				className={clsx(
					'transitionFast absolute flex justify-center items-center bottom-2 left-[-10px] bg-black w-[25px] h-[25px] text-white font-bold border-solid border-white border-[1px] rounded-full',
					clicksNumber.K12 === 0 ? 'opacity-0' : 'opacity-100'
				)}
			>
				{clicksNumber.K12}
			</div>
			<div className='flex flex-col items-center gap-y-1'>
				<svg
					width='30'
					height='30'
					viewBox='0 0 30 30'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M15 0.550049L23.2385 3.14952L28.8834 10.3363M15 0.550049L6.76157 3.14952L1.1167 10.3363M15 0.550049V8.3716M28.8834 10.3363V19.5109L23.2385 26.5448M28.8834 10.3363L21.6111 13.0115M1.1167 10.3363V19.5109L6.76157 26.5448M1.1167 10.3363L8.3889 13.0115M15 8.3716L21.6111 13.0115M15 8.3716L8.3889 13.0115M23.2385 26.5448L15 29.45L6.76157 26.5448M23.2385 26.5448L18.9667 20.7005M21.6111 13.0115L18.9667 20.7005M6.76157 26.5448L11.0334 20.7005M18.9667 20.7005H11.0334M11.0334 20.7005L8.3889 13.0115'
						stroke='white'
					/>
				</svg>
				<span className='text-xs text-white'>K12</span>
			</div>
		</button>
	)
}
