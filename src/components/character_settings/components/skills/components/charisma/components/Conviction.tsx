import { useState } from 'react'
import { SwordSVG } from '../../../../../../../assets/svg'
import clsx from 'clsx'

export const Conviction = () => {
	const [clickCount, changeClickCount] = useState<0 | 1 | 2>(0)
	return (
		<button
			className='flex w-full outline-none border-none h-min items-center text-white'
			onClick={() => {
				changeClickCount(prev => {
					if (prev === 0) return 1
					if (prev === 1) return 2
					else return 0
				})
			}}
		>
			<div className='relative mr-4 flex items-center justify-center w-[25px] h-[25px] border-solid border-white border-[1px] rotate-45'>
				<SwordSVG needShow={clickCount !== 0} needRotate={false} />
				<SwordSVG needShow={clickCount === 2} needRotate={true} />
			</div>
			<div className='mr-4 w-[25px] h-[25px] rounded-full border-white border-[1px] text-lg flex justify-center items-center'>
				<span
					className={clsx(
						'transitionFast overflow-hidden',
						clickCount === 1 ? 'w-[20px]' : 'w-0'
					)}
				>
					+2
				</span>
				<span
					className={clsx(
						'transitionFast overflow-hidden',
						clickCount === 2 ? 'w-[20px]' : 'w-0'
					)}
				>
					+4
				</span>
			</div>
			<span className='font-bold text-lg'>Убеждение</span>
		</button>
	)
}
