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

export const Insight: FC<IProps> = ({ calculateNewValueConsiderBonus }) => {
	const { currentCharacterInfo, isInitializedData } = useTypedSelector(
		state => state.Character
	)
	const { CharacterSaveApiResponse } = useActions()
	const [insight, changeInsight] = useState('0')
	const [updateCharacter] = useUpdateCharacterMutation()

	useEffect(() => {
		if (isInitializedData)
			changeInsight(currentCharacterInfo.modifiers.insight.toString())
	}, [isInitializedData])

	useEffect(() => {
		if (isNaN(parseInt(insight)) || !isInitializedData) return

		CharacterSaveApiResponse({
			...currentCharacterInfo,
			modifiers: {
				...currentCharacterInfo.modifiers,
				insight: parseInt(insight)
			}
		})
	}, [insight])

	const makeUpdateRequest = async (
		updatingField: IUpdatingFields,
		new_value: number
	) => {
		let updateData: ICharacterUpdate = {
			characterId: currentCharacterInfo.id,
			newValues: {}
		}
		if (updatingField === 'insight')
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					insight: new_value
				}
			}
		if (updatingField === 'insightBonus') {
			const newInsightValue = calculateNewValueConsiderBonus(insight, new_value)
			changeInsight(newInsightValue)
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					insightBonus: new_value,
					insight: parseInt(newInsightValue)
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
				bonusValue={currentCharacterInfo.modifiers.bonuses.insightBonus}
				updatingField={'insightBonus'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<Input
				inputValue={insight}
				changeInputValue={changeInsight}
				updatingField={'insight'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<span className='font-bold text-left'>
				Проница-
				<br />
				тельность
			</span>
		</div>
	)
}
