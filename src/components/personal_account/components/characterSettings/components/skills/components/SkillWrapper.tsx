import { FC } from 'react'
import image from '../../../../../../../assets/images/SkillBackground.png'

interface IProps {
	children: React.ReactNode
}

export const SkillWrapper: FC<IProps> = ({ children }) => {
	return (
		<div className='relative w-[200px] h-fit flex justify-start items-start'>
			<img
				src={image}
				className='absolute inset-0 w-full h-full pointer-events-none'
				alt='задний фон'
			/>
			<div className='flex flex-col w-full h-fit gap-y-2 p-3'>{children}</div>
		</div>
	)
}
