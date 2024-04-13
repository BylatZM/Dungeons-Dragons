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

export const Performance: FC<IProps> = ({ calculateNewValueConsiderBonus }) => {
	const { currentCharacterInfo, isInitializedData } = useTypedSelector(
		state => state.Character
	)
	const [updateCharacter] = useUpdateCharacterMutation()
	const { CharacterSaveApiResponse } = useActions()
	const [performance, changePerformance] = useState('0')

	useEffect(() => {
		if (isInitializedData)
			changePerformance(currentCharacterInfo.modifiers.athletics.toString())
	}, [isInitializedData])

	useEffect(() => {
		if (isNaN(parseInt(performance)) || !isInitializedData) return

		CharacterSaveApiResponse({
			...currentCharacterInfo,
			modifiers: {
				...currentCharacterInfo.modifiers,
				performance: parseInt(performance)
			}
		})
	}, [performance])

	const makeUpdateRequest = async (
		updatingField: IUpdatingFields,
		new_value: number
	) => {
		let updateData: ICharacterUpdate = {
			characterId: currentCharacterInfo.id,
			newValues: {}
		}
		if (updatingField === 'performance')
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					performance: new_value
				}
			}
		if (updatingField === 'performanceBonus') {
			const newPerformanceValue = calculateNewValueConsiderBonus(
				performance,
				new_value
			)
			changePerformance(newPerformanceValue)
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					performanceBonus: new_value,
					performance: parseInt(newPerformanceValue)
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
				bonusValue={currentCharacterInfo.modifiers.bonuses.performanceBonus}
				updatingField={'performanceBonus'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<Input
				inputValue={performance}
				changeInputValue={changePerformance}
				updatingField={'performance'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<span className='font-bold text-left'>
				Выступле-
				<br />
				ние
			</span>
		</div>
	)
}
