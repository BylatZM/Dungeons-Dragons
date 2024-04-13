import { useState, FC, useEffect } from 'react'
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

export const Fraud: FC<IProps> = ({ calculateNewValueConsiderBonus }) => {
	const { currentCharacterInfo, isInitializedData } = useTypedSelector(
		state => state.Character
	)
	const { CharacterSaveApiResponse } = useActions()
	const [updateCharacter] = useUpdateCharacterMutation()
	const [fraud, changeFraud] = useState('0')

	useEffect(() => {
		if (isInitializedData)
			changeFraud(currentCharacterInfo.modifiers.fraud.toString())
	}, [isInitializedData])

	useEffect(() => {
		if (isNaN(parseInt(fraud)) || !isInitializedData) return

		CharacterSaveApiResponse({
			...currentCharacterInfo,
			modifiers: {
				...currentCharacterInfo.modifiers,
				fraud: parseInt(fraud)
			}
		})
	}, [fraud])

	const makeUpdateRequest = async (
		updatingField: IUpdatingFields,
		new_value: number
	) => {
		let updateData: ICharacterUpdate = {
			characterId: currentCharacterInfo.id,
			newValues: {}
		}
		if (updatingField === 'fraud')
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					fraud: new_value
				}
			}
		if (updatingField === 'fraudBonus') {
			const newFraudValue = calculateNewValueConsiderBonus(fraud, new_value)
			changeFraud(newFraudValue)
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					fraudBonus: new_value,
					fraud: parseInt(newFraudValue)
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
				bonusValue={currentCharacterInfo.modifiers.bonuses.fraudBonus}
				updatingField={'fraudBonus'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<Input
				inputValue={fraud}
				changeInputValue={changeFraud}
				updatingField={'fraud'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<span className='font-bold'>Обман</span>
		</div>
	)
}
