import {
	CharacterSVG,
	ContentBackgroundSVG,
	NameFrameSVG
} from '../../../../assets/svg'
import { ButtonContent } from '../../../authentication/components/ButtonContent'
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
				'transitionGeneral fixed inset-0 m-auto z-20 overflow-hidden rounded-3xl',
				needToShow ? 'w-[520px] h-[550px]' : 'w-0 h-0 animate-spin'
			)}
		>
			<div className='bg-main px-5 py-5 absolute inset-x-0 top-0 z-10'>
				<span className={clsx('text-white text-4xl', !needToShow && 'hidden')}>
					Character Forge
				</span>
			</div>
			<div className='bg-gradient-main p-5 w-full h-full pt-24 relative'>
				<div className={clsx('flex justify-between', !needToShow && 'hidden')}>
					<div>
						<div className='flex justify-center'>
							<CharacterSVG color='#fff' dimension='140' />
						</div>
						<NameFrameSVG>
							<input
								className='outline-none border-none bg-inherit absolute top-7 inset-x-0 mx-auto w-[130px] text-white p-1 z-10'
								placeholder='Имя персонажа'
							/>
						</NameFrameSVG>
					</div>
					<div>
						<ContentBackgroundSVG>
							<div className='absolute inset-0 w-min h-1/2 m-auto'>
								<span className='text-lg font-bold'>Класс</span>
								<input
									placeholder='Класс персонажа'
									className='mt-4 w-[130px] bg-inherit outline-none border-none'
								/>
							</div>
						</ContentBackgroundSVG>
						<ContentBackgroundSVG>
							<div className='absolute inset-0 w-min h-1/2 m-auto'>
								<span className='text-lg font-bold'>Расса</span>
								<input
									placeholder='Расса персонажа'
									className='mt-4 w-[130px] bg-inherit outline-none border-none'
								/>
							</div>
						</ContentBackgroundSVG>
					</div>
				</div>
				<div
					className={clsx(
						'text-center absolute inset-x-0 bottom-5',
						!needToShow && 'hidden'
					)}
				>
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
	)
}
