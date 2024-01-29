import { FC } from 'react'
import { ICube } from '../../types/StatesTypes'
import clsx from 'clsx'

interface IProps {
	clicksNumber: ICube
	changeClicksNumber: React.Dispatch<React.SetStateAction<ICube>>
}

export const CubeK20SVG: FC<IProps> = ({
	clicksNumber,
	changeClicksNumber
}) => {
	return (
		<button
			className='relative min-w-[70px] h-[70px] rounded-full bg-black flex justify-center items-center'
			onClick={() =>
				changeClicksNumber(prev => ({ ...prev, K20: prev.K20 + 1 }))
			}
		>
			<div
				className={clsx(
					'transitionFast absolute flex justify-center items-center bottom-2 left-[-10px] bg-black w-[25px] h-[25px] text-white font-bold border-solid border-white border-[1px] rounded-full',
					clicksNumber.K20 === 0 ? 'opacity-0' : 'opacity-100'
				)}
			>
				{clicksNumber.K20}
			</div>
			<div className='flex flex-col items-center gap-y-1'>
				<svg
					width='26'
					height='31'
					viewBox='0 0 26 31'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M12.9999 1.0603L25.3635 9.25793M12.9999 1.0603L0.63623 9.25793M12.9999 1.0603V8.98915M25.3635 9.25793L12.9999 8.98915M25.3635 9.25793L20.66 20.8153M25.3635 9.25793V22.0247M0.63623 9.25793V22.0247M0.63623 9.25793L12.9999 8.98915M0.63623 9.25793L5.33979 20.8153M12.9999 8.98915L5.33979 20.8153M12.9999 8.98915L20.66 20.8153M20.66 20.8153L25.3635 22.0247M20.66 20.8153L12.9999 30.3567M20.66 20.8153H5.33979M25.3635 22.0247L12.9999 30.3567M12.9999 30.3567L0.63623 22.0247M12.9999 30.3567L5.33979 20.8153M0.63623 22.0247L5.33979 20.8153'
						stroke='white'
					/>
				</svg>
				<span className='text-xs text-white'>K20</span>
			</div>
		</button>
	)
}
