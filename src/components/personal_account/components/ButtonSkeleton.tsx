import { FC } from 'react'
import { ButtonBackgroundSVG } from '../../../assets/svg'

interface IProps {
	text: string
	color: string
}

export const ButtonSkeleton: FC<IProps> = ({ color, text }) => {
	return (
		<>
			<ButtonBackgroundSVG color={color} />
			<span className='absolute inset-0 pt-2' style={{ color: color }}>
				{text}
			</span>
		</>
	)
}
