import clsx from 'clsx'
import { FC } from 'react'

export const Curtain: FC<{ needToShow: boolean }> = ({ needToShow }) => {
	return (
		<div
			className={clsx(
				'transitionGeneral fixed inset-0 bg-gray-300 bg-opacity-10 backdrop-blur-md z-20',
				needToShow ? 'w-full' : 'w-0'
			)}
		></div>
	)
}
