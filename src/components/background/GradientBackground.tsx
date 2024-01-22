import { FC } from 'react'

interface IProps {
	children: React.ReactNode
}

export const GradientBackground: FC<IProps> = ({ children }) => {
	return (
		<div className='w-full min-h-screen bg-gradient-main px-20 py-40 overflow-y-auto'>
			{children}
		</div>
	)
}
