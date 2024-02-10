import { ButtonContent } from '../../../authentication/components/ButtonContent'
import { Character } from '../../../Character'
import { ButtonSkeleton } from '../ButtonSkeleton'
import clsx from 'clsx'
import { FC } from 'react'
import { CharacterGrade } from './components/CharacterGrade'
import { CharacterRace } from './components/CharacterRace'

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
				'transitionGeneral fixed right-0 bottom-0 bg-gray-300 bg-opacity-10 backdrop-blur-md z-20 overflow-hidden flex justify-center items-center',
				needToShow ? 'w-full h-full' : 'w-0 h-0'
			)}
		>
			<div className='h-fit min-w-[536px] max-w-[536px] rounded-md overflow-hidden'>
				<div className='bg-main px-5 py-5 z-10'>
					<span className='text-white text-4xl'>Character Forge</span>
				</div>
				<div className='bg-gradient-main p-5 w-full h-full'>
					<div className='flex justify-between gap-x-4'>
						<Character imageDimension='165' nameBlockWidth='300' gap='20' />
						<div>
							<CharacterGrade />
							<CharacterRace />
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
									text='Создать'
									color='#3b82f6'
									isLoading={false}
								/>
							</div>
							<div className='transitionGeneral absolute  inset-0 w-full h-full passive'>
								<ButtonContent text='Создать' color='#fff' isLoading={false} />
							</div>
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
