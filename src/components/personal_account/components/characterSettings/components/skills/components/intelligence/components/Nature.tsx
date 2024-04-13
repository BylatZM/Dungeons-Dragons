import { FC, useEffect, useState } from 'react'
import { Input } from '../../../ability/Input'
import { CheckBox } from '../../../ability/CheckBox'
import {
	ICharacterUpdate,
	IUpdatingFields
} from '../../../../../../../../../types'
import { useTypedSelector } from '../../../../../../../../hooks/useTypedSelection'
import { useActions } from '../../../../../../../../hooks/useActions'
import { useUpdateCharacterMutation } from '../../../../../../../../../store/api/characterApiSlice'

interface IProps {
	calculateNewValueConsiderBonus: (
		modifierValue: string,
		bonusValue: number
	) => string
}

export const Nature: FC<IProps> = ({ calculateNewValueConsiderBonus }) => {
	const { currentCharacterInfo, isInitializedData } = useTypedSelector(
		state => state.Character
	)
	const [updateCharacter] = useUpdateCharacterMutation()
	const { CharacterSaveApiResponse } = useActions()
	const [nature, changeNature] = useState('0')

	useEffect(() => {
		if (isInitializedData)
			changeNature(currentCharacterInfo.modifiers.nature.toString())
	}, [isInitializedData])

	useEffect(() => {
		if (isNaN(parseInt(nature)) || !isInitializedData) return

		CharacterSaveApiResponse({
			...currentCharacterInfo,
			modifiers: {
				...currentCharacterInfo.modifiers,
				nature: parseInt(nature)
			}
		})
	}, [nature])

	const makeUpdateRequest = async (
		updatingField: IUpdatingFields,
		new_value: number
	) => {
		let updateData: ICharacterUpdate = {
			characterId: currentCharacterInfo.id,
			newValues: {}
		}
		if (updatingField === 'natureBonus') {
			const newNatureValue = calculateNewValueConsiderBonus(nature, new_value)
			changeNature(newNatureValue)
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					natureBonus: new_value,
					nature: parseInt(newNatureValue)
				}
			}
		}
		if (updatingField === 'nature')
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					nature: new_value
				}
			}
		if (Object.keys(updateData.newValues).length !== 0) {
			await updateCharacter(updateData).unwrap()
		}
	}

	return (
		<div className='flex w-full h-min'>
			<CheckBox
				bonusValue={currentCharacterInfo.modifiers.bonuses.natureBonus}
				updatingField={'natureBonus'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<Input
				inputValue={nature}
				changeInputValue={changeNature}
				updatingField={'nature'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<span className='font-bold'>Природа</span>
		</div>
	)
}
