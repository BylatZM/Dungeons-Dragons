import { FC, useEffect, useState } from 'react'
import { CheckBox } from '../../../ability/CheckBox'
import { Input } from '../../../ability/Input'
import { useTypedSelector } from '../../../../../../../../hooks/useTypedSelection'
import { useActions } from '../../../../../../../../hooks/useActions'
import { IUpdatingFields } from '../../../../../../../../../types'

interface IProps {
	makeUpdateRequest: (
		updatingField: IUpdatingFields,
		new_value: number
	) => Promise<void>
}

export const AnimalCare: FC<IProps> = ({ makeUpdateRequest }) => {
	const { currentCharacterInfo, isInitializedData } = useTypedSelector(
		state => state.Character
	)
	const { CharacterSaveApiResponse } = useActions()
	const [animalCare, changeAnimalCare] = useState('0')

	useEffect(() => {
		if (isInitializedData)
			changeAnimalCare(currentCharacterInfo.modifiers.animalCare.toString())
	}, [isInitializedData])

	useEffect(() => {
		if (isNaN(parseInt(animalCare)) || !isInitializedData) return

		CharacterSaveApiResponse({
			...currentCharacterInfo,
			modifiers: {
				...currentCharacterInfo.modifiers,
				animalCare: parseInt(animalCare)
			}
		})
	}, [animalCare])

	return (
		<div className='flex items-center w-full h-min'>
			<CheckBox
				inputValue={animalCare}
				changeInputValue={changeAnimalCare}
				updatingField={'animalCare'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<Input
				inputValue={animalCare}
				changeInputValue={changeAnimalCare}
				updatingField={'animalCare'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<span className='font-bold text-left'>
				Уход за живот-
				<br />
				ными
			</span>
		</div>
	)
}
