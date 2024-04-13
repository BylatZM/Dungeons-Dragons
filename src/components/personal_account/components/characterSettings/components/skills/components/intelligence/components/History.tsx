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

export const History: FC<IProps> = ({ calculateNewValueConsiderBonus }) => {
	const { currentCharacterInfo, isInitializedData } = useTypedSelector(
		state => state.Character
	)
	const [updateCharacter] = useUpdateCharacterMutation()
	const { CharacterSaveApiResponse } = useActions()
	const [history, changeHistory] = useState('0')

	useEffect(() => {
		if (isInitializedData)
			changeHistory(currentCharacterInfo.modifiers.history.toString())
	}, [isInitializedData])

	useEffect(() => {
		if (isNaN(parseInt(history)) || !isInitializedData) return

		CharacterSaveApiResponse({
			...currentCharacterInfo,
			modifiers: {
				...currentCharacterInfo.modifiers,
				history: parseInt(history)
			}
		})
	}, [history])

	const makeUpdateRequest = async (
		updatingField: IUpdatingFields,
		new_value: number
	) => {
		let updateData: ICharacterUpdate = {
			characterId: currentCharacterInfo.id,
			newValues: {}
		}
		if (updatingField === 'historyBonus') {
			const newHistoryValue = calculateNewValueConsiderBonus(history, new_value)
			changeHistory(newHistoryValue)
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					historyBonus: new_value,
					history: parseInt(newHistoryValue)
				}
			}
		}
		if (updatingField === 'history')
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					history: new_value
				}
			}
		if (Object.keys(updateData.newValues).length !== 0) {
			await updateCharacter(updateData).unwrap()
		}
	}

	return (
		<div className='flex w-full h-min'>
			<CheckBox
				bonusValue={currentCharacterInfo.modifiers.bonuses.historyBonus}
				updatingField={'historyBonus'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<Input
				inputValue={history}
				changeInputValue={changeHistory}
				updatingField={'history'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<span className='font-bold'>История</span>
		</div>
	)
}
