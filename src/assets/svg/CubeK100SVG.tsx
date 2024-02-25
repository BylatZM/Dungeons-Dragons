import { FC } from 'react'
import { ICube } from '../../types'
import clsx from 'clsx'

interface IProps {
	clicksNumber: ICube
	changeClicksNumber: React.Dispatch<React.SetStateAction<ICube>>
}

export const CubeK100SVG: FC<IProps> = ({
	clicksNumber,
	changeClicksNumber
}) => {
	return (
		<button
			className='relative min-w-[70px] h-[70px] rounded-full bg-black flex justify-center items-center'
			onClick={() =>
				changeClicksNumber(prev => ({ ...prev, K100: prev.K100 + 1 }))
			}
		>
			<div
				className={clsx(
					'transitionFast absolute flex justify-center items-center bottom-2 left-[-10px] bg-black w-[25px] h-[25px] text-white font-bold border-solid border-white border-[1px] rounded-full',
					clicksNumber.K100 === 0 ? 'opacity-0' : 'opacity-100'
				)}
			>
				{clicksNumber.K100}
			</div>
			<div className='flex flex-col items-center gap-y-1'>
				<svg
					width='34'
					height='34'
					viewBox='0 0 34 34'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M10.3926 1.0177L19.4238 10.3521M10.3926 1.0177L1.36133 10.3521M10.3926 1.0177L14.7861 9.69698M10.3926 1.0177L5.99898 9.69698M19.4238 10.3521L10.3926 19.7682M19.4238 10.3521L14.7861 9.69698M1.36133 10.3521L10.3926 19.7682M1.36133 10.3521L5.99898 9.69698M14.7861 9.69698L10.3926 11.8259M5.99898 9.69698L10.3926 11.8259M10.3926 19.7682V11.8259'
						stroke='white'
					/>
					<path
						d='M22.7778 13.4032L31.809 22.7375M22.7778 13.4032L13.7466 22.7375M22.7778 13.4032L27.1713 22.0824M22.7778 13.4032L18.3843 22.0824M31.809 22.7375L22.7778 32.1537M31.809 22.7375L27.1713 22.0824M13.7466 22.7375L22.7778 32.1537M13.7466 22.7375L18.3843 22.0824M27.1713 22.0824L22.7778 24.2113M18.3843 22.0824L22.7778 24.2113M22.7778 32.1537V24.2113'
						stroke='white'
					/>
				</svg>
				<span className='text-xs text-white'>K100</span>
			</div>
		</button>
	)
}
