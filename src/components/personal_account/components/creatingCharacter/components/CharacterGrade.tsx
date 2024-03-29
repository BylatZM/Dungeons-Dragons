import { FC, useState } from 'react'
import { ICharacterCreateForm, ICharacterGrade } from '../../../../../types'
import { ArrowSVG, ContentBackgroundSVG } from '../../../../../assets/svg'
import clsx from 'clsx'
import SelectBackground from '../../../../../assets/images/SkillBackground.png'
import { useTypedSelector } from '../../../../hooks/useTypedSelection'

interface IProps {
	changeFormData: React.Dispatch<React.SetStateAction<ICharacterCreateForm>>
	formData: ICharacterCreateForm
}

export const CharacterGrade: FC<IProps> = ({ changeFormData, formData }) => {
	const [selectedGrade, changeSelectedGrade] = useState<ICharacterGrade>(
		formData.class
	)
	const [selectorActive, changeSelectorActive] = useState(false)
	const { characterClasses } = useTypedSelector(state => state.Character)

	return (
		<ContentBackgroundSVG dimension='180'>
			<div className='w-full h-1/2 relative inset-y-10 text-center'>
				<span className='text-lg font-bold block'>Класс</span>
				<button
					className='relative w-5/6 mt-4 p-2 mx-auto outline-none border-none rounded-md text-white bg-inherit'
					onClick={() => changeSelectorActive(prev => !prev)}
				>
					<img
						src={SelectBackground}
						alt='Задний фон'
						className='pointer-events-none absolute w-[150px] h-[40px] inset-0'
					/>
					{selectedGrade}
					<div
						className={clsx(
							'transitionFast absolute w-fit h-fit right-1 inset-y-0 my-auto',
							selectorActive ? 'rotate-180' : 'rotate-90'
						)}
					>
						<ArrowSVG color='#fff' />
					</div>
				</button>
				<div
					className={clsx(
						'transitionFast absolute border-2 bg-main mt-6 w-[180px] flex flex-col gap-y-2 z-10',
						selectorActive
							? 'h-[250px] p-2 overflow-y-auto border-white'
							: 'h-0 overflow-hidden border-none'
					)}
				>
					{characterClasses.map((el, key) => (
						<button
							key={key}
							className={clsx(
								'outline-none border-2 p-2 text-center font-bold',
								selectedGrade === el
									? 'border-none bg-white color-main'
									: 'bg-inherit border-white text-white'
							)}
							onClick={() => {
								if (selectedGrade !== el) {
									changeFormData(prev => ({ ...prev, class: el }))
									changeSelectorActive(false)
									changeSelectedGrade(el)
								}
							}}
						>
							{el}
						</button>
					))}
				</div>
			</div>
		</ContentBackgroundSVG>
	)
}
