import { FC } from 'react'
import { clsx } from 'clsx'

interface IProps {
	needRotate: boolean
	needShow: boolean
}

export const SwordSVG: FC<IProps> = ({ needRotate, needShow }) => {
	return (
		<svg
			className={clsx(
				'transitionFast absolute w-[20px] h-[20px]',
				needShow ? 'opacity-100' : 'opacity-0'
			)}
			style={{ rotate: needRotate ? '-90deg' : '0deg' }}
			viewBox='0 0 12 12'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M12 0L11.25 2.25001L4.45601 8.4263L4.11711 7.90411L3.56961 7.54879L9.75002 0.750004L12 0ZM4.64206 11.0748L5.17239 10.5444L3.71103 8.29346L1.46012 6.83207L0.92978 7.36242L2.40098 8.83365L0.795063 10.6005C0.585815 10.573 0.366723 10.639 0.205943 10.7997C-0.0686478 11.0743 -0.0686478 11.5195 0.205943 11.7941C0.480534 12.0686 0.925702 12.0686 1.20029 11.7941C1.36098 11.6334 1.42688 11.4144 1.39951 11.2052L3.16645 9.59917L4.64206 11.0748Z'
				fill='white'
			/>
		</svg>
	)
}
