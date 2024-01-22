import { FC } from 'react'
import { ButtonBackgroundSVG, SpinnerSVG } from '../../../assets/svg'

interface IButtonContentProps {
	text: string
	color: string
	isLoading: boolean
}

export const ButtonContent: FC<IButtonContentProps> = ({
	text,
	color,
	isLoading
}) => {
	return (
		<>
			<ButtonBackgroundSVG color={color} />
			<span className='absolute inset-0 pt-2' style={{ color: color }}>
				{!isLoading && text}
				{isLoading && (
					<div>
						<SpinnerSVG color={color} />
						<span className='ml-2'>Загрузка</span>
					</div>
				)}
			</span>
		</>
	)
}
