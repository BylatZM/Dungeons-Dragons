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

export const Intimidation: FC<IProps> = ({
	calculateNewValueConsiderBonus
}) => {
	const { currentCharacterInfo, isInitializedData } = useTypedSelector(
		state => state.Character
	)
	const [updateCharacter] = useUpdateCharacterMutation()
	const { CharacterSaveApiResponse } = useActions()
	const [intimidation, changeIntimidation] = useState('0')

	useEffect(() => {
		if (isInitializedData)
			changeIntimidation(currentCharacterInfo.modifiers.intimidation.toString())
	}, [isInitializedData])

	useEffect(() => {
		if (isNaN(parseInt(intimidation)) || !isInitializedData) return

		CharacterSaveApiResponse({
			...currentCharacterInfo,
			modifiers: {
				...currentCharacterInfo.modifiers,
				intimidation: parseInt(intimidation)
			}
		})
	}, [intimidation])

	const makeUpdateRequest = async (
		updatingField: IUpdatingFields,
		new_value: number
	) => {
		let updateData: ICharacterUpdate = {
			characterId: currentCharacterInfo.id,
			newValues: {}
		}
		if (updatingField === 'intimidation')
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					intimidation: new_value
				}
			}
		if (updatingField === 'intimidationBonus') {
			const newIntimidationValue = calculateNewValueConsiderBonus(
				intimidation,
				new_value
			)
			changeIntimidation(newIntimidationValue)
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					intimidationBonus: new_value,
					intimidation: parseInt(newIntimidationValue)
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
				bonusValue={currentCharacterInfo.modifiers.bonuses.intimidationBonus}
				updatingField={'intimidationBonus'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<Input
				inputValue={intimidation}
				changeInputValue={changeIntimidation}
				updatingField={'intimidation'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<span className='font-bold text-left'>
				Запугива-
				<br />
				ние
			</span>
		</div>
	)
}
