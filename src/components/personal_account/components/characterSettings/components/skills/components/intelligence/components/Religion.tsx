import { FC, useEffect, useState } from 'react'
import { Input } from '../../../ability/Input'
import { CheckBox } from '../../../ability/CheckBox'
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

export const Religion: FC<IProps> = ({ calculateNewValueConsiderBonus }) => {
	const { currentCharacterInfo, isInitializedData } = useTypedSelector(
		state => state.Character
	)
	const [updateCharacter] = useUpdateCharacterMutation()
	const { CharacterSaveApiResponse } = useActions()
	const [religion, changeReligion] = useState('0')

	useEffect(() => {
		if (isInitializedData)
			changeReligion(currentCharacterInfo.modifiers.religion.toString())
	}, [isInitializedData])

	useEffect(() => {
		if (isNaN(parseInt(religion)) || !isInitializedData) return

		CharacterSaveApiResponse({
			...currentCharacterInfo,
			modifiers: {
				...currentCharacterInfo.modifiers,
				religion: parseInt(religion)
			}
		})
	}, [religion])

	const makeUpdateRequest = async (
		updatingField: IUpdatingFields,
		new_value: number
	) => {
		let updateData: ICharacterUpdate = {
			characterId: currentCharacterInfo.id,
			newValues: {}
		}
		if (updatingField === 'religionBonus') {
			const newReligionValue = calculateNewValueConsiderBonus(
				religion,
				new_value
			)
			changeReligion(newReligionValue)
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					religionBonus: new_value,
					religion: parseInt(newReligionValue)
				}
			}
		}
		if (updatingField === 'religion')
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					religion: new_value
				}
			}
		if (Object.keys(updateData.newValues).length !== 0) {
			await updateCharacter(updateData).unwrap()
		}
	}

	return (
		<div className='flex w-full h-min'>
			<CheckBox
				bonusValue={currentCharacterInfo.modifiers.bonuses.religionBonus}
				updatingField={'religionBonus'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<Input
				inputValue={religion}
				changeInputValue={changeReligion}
				updatingField={'religion'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<span className='font-bold'>Религия</span>
		</div>
	)
}
