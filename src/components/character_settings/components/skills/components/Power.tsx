import SkillBackground from '../../../../../assets/images/SkillBackground.png'
import AbilityBackground from '../../../../../assets/images/AbilityBackground.png'
import { useState } from 'react'
import { SwordSVG } from '../../../../../assets/svg'
import { clsx } from 'clsx'

export const Power = () => {
	const [clickCount, changeClickCount] = useState<0 | 1 | 2>(0)
	return (
		<div className='flex gap-x-4'>
			<div className='relative w-[230px] h-[280px] flex justify-center items-center'>
				<img
					src={SkillBackground}
					className='absolute inset-0 w-full h-full pointer-events-none'
					alt='задний фон'
				/>
				<div className='flex flex-col w-full h-[70%] justify-between items-center'>
					<span className='text-xl font-bold text-white'>Сила</span>
					<div className='relative mx-auto py-3 pl-3 overflow-hidden border-solid border-white border-[1px] rounded-full w-[35px] h-[35px]'>
						<input
							type='number'
							onChange={e => {
								if (parseInt(e.target.value) > 30) e.target.value = '30'
							}}
							className='absolute inset-0 m-auto w-[50px] ml-3 outline-none text-lg text-white bg-inherit'
						/>
					</div>
				</div>
			</div>
			<div className='relative w-[300px] h-[280px] flex justify-center py-[8%] px-14'>
				<img
					src={AbilityBackground}
					className='absolute inset-0 w-full h-full pointer-events-none'
					alt='задний фон'
				/>
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
					<div className='mr-4 relative flex items-center justify-center w-[25px] h-[25px] border-solid border-white border-[1px] rotate-45'>
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
					<span className='font-bold text-lg'>Атлетика</span>
				</button>
			</div>
		</div>
	)
}
