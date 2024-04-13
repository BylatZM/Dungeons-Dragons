import { FC, useEffect, useState } from 'react'
import { CheckBox } from '../../../ability/CheckBox'
import { Input } from '../../../ability/Input'
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

export const Medicine: FC<IProps> = ({ calculateNewValueConsiderBonus }) => {
	const { currentCharacterInfo, isInitializedData } = useTypedSelector(
		state => state.Character
	)
	const [updateCharacter] = useUpdateCharacterMutation()
	const { CharacterSaveApiResponse } = useActions()
	const [medicine, changeMedicine] = useState('0')

	useEffect(() => {
		if (isInitializedData)
			changeMedicine(currentCharacterInfo.modifiers.medicine.toString())
	}, [isInitializedData])

	useEffect(() => {
		if (isNaN(parseInt(medicine)) || !isInitializedData) return

		CharacterSaveApiResponse({
			...currentCharacterInfo,
			modifiers: {
				...currentCharacterInfo.modifiers,
				medicine: parseInt(medicine)
			}
		})
	}, [medicine])

	const makeUpdateRequest = async (
		updatingField: IUpdatingFields,
		new_value: number
	) => {
		let updateData: ICharacterUpdate = {
			characterId: currentCharacterInfo.id,
			newValues: {}
		}
		if (updatingField === 'medicine')
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					medicine: new_value
				}
			}
		if (updatingField === 'medicineBonus') {
			const newMedicineValue = calculateNewValueConsiderBonus(
				medicine,
				new_value
			)
			changeMedicine(newMedicineValue)
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					medicineBonus: new_value,
					medicine: parseInt(newMedicineValue)
				}
			}
		}
		if (Object.keys(updateData.newValues).length !== 0) {
			await updateCharacter(updateData).unwrap()
		}
	}

	return (
		<div className='flex w-full h-min'>
			<CheckBox
				bonusValue={currentCharacterInfo.modifiers.bonuses.medicineBonus}
				updatingField={'medicineBonus'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<Input
				inputValue={medicine}
				changeInputValue={changeMedicine}
				updatingField={'medicine'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<span className='font-bold'>Медицина</span>
		</div>
	)
}
