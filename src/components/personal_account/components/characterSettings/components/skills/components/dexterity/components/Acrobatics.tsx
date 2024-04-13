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

export const Acrobatics: FC<IProps> = ({ calculateNewValueConsiderBonus }) => {
	const { currentCharacterInfo, isInitializedData } = useTypedSelector(
		state => state.Character
	)
	const [updateCharacter] = useUpdateCharacterMutation()
	const { CharacterSaveApiResponse } = useActions()
	const [acrobatics, changeAcrobatics] = useState('0')

	useEffect(() => {
		if (isInitializedData)
			changeAcrobatics(currentCharacterInfo.modifiers.perception.toString())
	}, [isInitializedData])

	useEffect(() => {
		if (isNaN(parseInt(acrobatics)) || !isInitializedData) return

		CharacterSaveApiResponse({
			...currentCharacterInfo,
			modifiers: {
				...currentCharacterInfo.modifiers,
				acrobatics: parseInt(acrobatics)
			}
		})
	}, [acrobatics])

	const makeUpdateRequest = async (
		updatingField: IUpdatingFields,
		new_value: number
	) => {
		let updateData: ICharacterUpdate = {
			characterId: currentCharacterInfo.id,
			newValues: {}
		}
		if (updatingField === 'acrobatics')
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					acrobatics: new_value
				}
			}
		if (updatingField === 'acrobaticsBonus') {
			const newAcrobaticsValue = calculateNewValueConsiderBonus(
				acrobatics,
				new_value
			)
			changeAcrobatics(newAcrobaticsValue)
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					acrobaticsBonus: new_value,
					acrobatics: parseInt(newAcrobaticsValue)
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
				bonusValue={currentCharacterInfo.modifiers.bonuses.acrobaticsBonus}
				updatingField={'acrobaticsBonus'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<Input
				inputValue={acrobatics}
				changeInputValue={changeAcrobatics}
				updatingField={'acrobatics'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<span className='font-bold'>Акробатика</span>
		</div>
	)
}
