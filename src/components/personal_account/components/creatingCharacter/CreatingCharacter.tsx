import { ButtonContent } from '../../../authentication/components/ButtonContent'
import { Character } from '../../../Character'
import { ButtonSkeleton } from '../ButtonSkeleton'
import clsx from 'clsx'
import { FC, useState } from 'react'
import { CharacterGrade } from './components/CharacterGrade'
import { CharacterRace } from './components/CharacterRace'
import { ICharacterCreateForm } from '../../../../types'
import { createCharacter } from '../../../../store/api/characterApiSlice'

interface IProps {
	needToShow: boolean
	changeNeedShowFrame: React.Dispatch<React.SetStateAction<boolean>>
}

const defaultFormData: ICharacterCreateForm = {
	name: '',
	class: 'Воин',
	race: '',
	image: null
}

export const CreatingCharacter: FC<IProps> = ({
	needToShow,
	changeNeedShowFrame
}) => {
	const [formData, changeFormData] =
		useState<ICharacterCreateForm>(defaultFormData)
	const [imageSrc, setImageSrc] = useState<string | null>(null)
	const [isCharacterCreating, setIsCharacterCreating] = useState(false)

	const makeRequest = async () => {
		setIsCharacterCreating(prev => true)
		let data = new FormData()
		data.append('name', formData.name)
		data.append('class', formData.class)
		data.append('race', formData.race)
		if (formData.image) data.append('image', formData.image)

		const response = await createCharacter(data)

		setIsCharacterCreating(prev => false)
		if (response) {
			setImageSrc(null)
			changeFormData(defaultFormData)
			changeNeedShowFrame(false)
		}
	}

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
						<Character
							formData={formData}
							changeFormData={changeFormData}
							imageDimension='165'
							nameBlockWidth='300'
							gap='20'
							setImageSrc={setImageSrc}
							imageSrc={imageSrc}
						/>
						<div>
							<CharacterGrade
								changeFormData={changeFormData}
								formData={formData}
							/>
							<CharacterRace
								changeFormData={changeFormData}
								formData={formData}
							/>
						</div>
					</div>
					<div className='text-center'>
						<button
							className='mr-2 relative bg-none border-none outline-none w-[180px] h-[40px] button'
							onClick={() => {
								changeFormData(defaultFormData)
								setImageSrc(null)
								changeNeedShowFrame(false)
							}}
						>
							<div className='absolute inset-0 w-full h-full'>
								<ButtonSkeleton text='Закрыть' color='#3b82f6' />
							</div>
							<div className='transitionGeneral absolute  inset-0 w-full h-full passive'>
								<ButtonSkeleton text='Закрыть' color='#fff' />
							</div>
						</button>
						<button
							className='relative bg-none border-none outline-none w-[180px] h-[40px] button'
							onClick={makeRequest}
						>
							<div className='absolute inset-0 w-full h-full'>
								<ButtonContent
									text='Создать'
									color='#3b82f6'
									isLoading={isCharacterCreating}
								/>
							</div>
							<div className='transitionGeneral absolute  inset-0 w-full h-full passive'>
								<ButtonContent
									text='Создать'
									color='#fff'
									isLoading={isCharacterCreating}
								/>
							</div>
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
