import { FC, useEffect, useState } from 'react'
import { CheckBox } from '../../../ability/CheckBox'
import { Input } from '../../../ability/Input'
import { useTypedSelector } from '../../../../../../../../hooks/useTypedSelection'
import { useActions } from '../../../../../../../../hooks/useActions'
import {
	ICharacterUpdate,
	IUpdatingFields
} from '../../../../../../../../../types'
import { useUpdateCharacterMutation } from '../../../../../../../../../store/api/characterApiSlice'

interface IProps {
	calculateNewValueConsiderBonus: (
		modifierValue: string,
		bonusValue: number
	) => string
}

export const AnimalCare: FC<IProps> = ({ calculateNewValueConsiderBonus }) => {
	const { currentCharacterInfo, isInitializedData } = useTypedSelector(
		state => state.Character
	)
	const [updateCharacter] = useUpdateCharacterMutation()
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

	const makeUpdateRequest = async (
		updatingField: IUpdatingFields,
		new_value: number
	) => {
		let updateData: ICharacterUpdate = {
			characterId: currentCharacterInfo.id,
			newValues: {}
		}
		if (updatingField === 'animalCare')
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					animalCare: new_value
				}
			}
		if (updatingField === 'animalCareBonus') {
			const newAnimalCareValue = calculateNewValueConsiderBonus(
				animalCare,
				new_value
			)
			changeAnimalCare(newAnimalCareValue)
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					animalCareBonus: new_value,
					animalCare: parseInt(newAnimalCareValue)
				}
			}
		}
		if (Object.keys(updateData.newValues).length !== 0) {
			await updateCharacter(updateData).unwrap()
		}
	}

	return (
		<div className='flex items-center w-full h-min'>
			<CheckBox
				bonusValue={currentCharacterInfo.modifiers.bonuses.animalCareBonus}
				updatingField={'animalCareBonus'}
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
