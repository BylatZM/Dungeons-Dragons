import { FC } from 'react'
import { ICube } from '../../types'
import clsx from 'clsx'

interface IProps {
	clicksNumber: ICube
	changeClicksNumber: React.Dispatch<React.SetStateAction<ICube>>
}

export const CubeK8SVG: FC<IProps> = ({ clicksNumber, changeClicksNumber }) => {
	return (
		<button
			className='relative min-w-[70px] h-[70px] rounded-full bg-black flex justify-center items-center'
			onClick={() => changeClicksNumber(prev => ({ ...prev, K8: prev.K8 + 1 }))}
		>
			<div
				className={clsx(
					'transitionFast absolute flex justify-center items-center bottom-2 left-[-10px] bg-black w-[25px] h-[25px] text-white font-bold border-solid border-white border-[1px] rounded-full',
					clicksNumber.K8 === 0 ? 'opacity-0' : 'opacity-100'
				)}
			>
				{clicksNumber.K8}
			</div>
			<div className='flex flex-col items-center gap-y-1'>
				<svg
					width='26'
					height='32'
					viewBox='0 0 26 32'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M12.9999 1.2666L25.4666 10.4213V22.1507M12.9999 1.2666L0.533203 10.4213V22.1507M12.9999 1.2666L0.533203 22.1507M12.9999 1.2666L25.4666 22.1507M25.4666 22.1507L12.9999 30.7333L0.533203 22.1507M25.4666 22.1507H0.533203'
						stroke='white'
					/>
				</svg>
				<span className='text-xs text-white'>K8</span>
			</div>
		</button>
	)
}
