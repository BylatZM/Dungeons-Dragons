import { ContentBackgroundSVG } from '../../../../assets/svg'
import { ButtonContent } from '../../../authentication/components/ButtonContent'
import { Character } from '../../../Character'
import { ButtonSkeleton } from '../ButtonSkeleton'
import clsx from 'clsx'
import { FC } from 'react'

interface IProps {
	needToShow: boolean
	changeNeedShowFrame: React.Dispatch<React.SetStateAction<boolean>>
}

export const CreatingCharacter: FC<IProps> = ({
	needToShow,
	changeNeedShowFrame
}) => {
	return (
		<div
			className={clsx(
				'transitionGeneral fixed inset-0 m-auto bg-gray-300 bg-opacity-10 backdrop-blur-md z-20 overflow-hidden flex justify-center items-center',
				needToShow ? 'w-full h-full' : 'w-0 h-0'
			)}
		>
			<div className=' h-fit rounded-md overflow-hidden'>
				<div className='bg-main px-5 py-5 z-10'>
					<span className='text-white text-4xl'>Character Forge</span>
				</div>
				<div className='bg-gradient-main p-5 w-full h-full'>
					<div className='flex justify-between gap-x-4'>
						<Character imageDimension='165' nameBlockWidth='300' gap='20' />
						<div>
							<ContentBackgroundSVG dimension='180'>
								<div className='w-full h-1/2 relative inset-y-10 text-center'>
									<span className='text-lg font-bold block'>Класс</span>
									<input
										placeholder='Класс'
										className='mt-4 w-[45px] bg-inherit outline-none border-none'
									/>
								</div>
							</ContentBackgroundSVG>
							<ContentBackgroundSVG dimension='180'>
								<div className='w-full h-1/2 relative inset-y-10 text-center'>
									<span className='text-lg font-bold block'>Расса</span>
									<input
										placeholder='Расса'
										className='mt-4 w-[42px] bg-inherit outline-none border-none'
									/>
								</div>
							</ContentBackgroundSVG>
						</div>
					</div>
					<div className='text-center'>
						<button
							className='mr-2 relative bg-none border-none outline-none w-[180px] h-[40px] button'
							onClick={() => changeNeedShowFrame(false)}
						>
							<div className='absolute inset-0 w-full h-full'>
								<ButtonSkeleton text='Закрыть' color='#3b82f6' />
							</div>
							<div className='transitionGeneral absolute  inset-0 w-full h-full passive'>
								<ButtonSkeleton text='Закрыть' color='#fff' />
							</div>
						</button>
						<button className='relative bg-none border-none outline-none w-[180px] h-[40px] button'>
							<div className='absolute inset-0 w-full h-full'>
								<ButtonContent
									text='Создать персонажа'
									color='#3b82f6'
									isLoading={false}
								/>
							</div>
							<div className='transitionGeneral absolute  inset-0 w-full h-full passive'>
								<ButtonContent
									text='Создать персонажа'
									color='#fff'
									isLoading={false}
								/>
							</div>
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
