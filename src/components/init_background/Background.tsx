import './Background.css'
import { FC } from 'react'

interface ILayoutProps {
	children: React.ReactNode
}

export const Background: FC<ILayoutProps> = ({ children }) => {
	return (
		<div className='back_main overflow-hidden'>
			<div className='fixed inset-0 back_main_gradient z-10'></div>
			{children}
		</div>
	)
}
