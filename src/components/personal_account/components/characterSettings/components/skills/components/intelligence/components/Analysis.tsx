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

export const Analysis: FC<IProps> = ({ calculateNewValueConsiderBonus }) => {
	const { currentCharacterInfo, isInitializedData } = useTypedSelector(
		state => state.Character
	)
	const [updateCharacter] = useUpdateCharacterMutation()
	const { CharacterSaveApiResponse } = useActions()
	const [analysis, changeAnalysis] = useState('0')

	useEffect(() => {
		if (isInitializedData)
			changeAnalysis(currentCharacterInfo.modifiers.analysis.toString())
	}, [isInitializedData])

	useEffect(() => {
		if (isNaN(parseInt(analysis)) || !isInitializedData) return

		CharacterSaveApiResponse({
			...currentCharacterInfo,
			modifiers: {
				...currentCharacterInfo.modifiers,
				analysis: parseInt(analysis)
			}
		})
	}, [analysis])

	const makeUpdateRequest = async (
		updatingField: IUpdatingFields,
		new_value: number
	) => {
		let updateData: ICharacterUpdate = {
			characterId: currentCharacterInfo.id,
			newValues: {}
		}
		if (updatingField === 'analysisBonus') {
			const newAnalysisValue = calculateNewValueConsiderBonus(
				analysis,
				new_value
			)
			changeAnalysis(newAnalysisValue)
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					analysisBonus: new_value,
					analysis: parseInt(newAnalysisValue)
				}
			}
		}
		if (updatingField === 'analysis')
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					analysis: new_value
				}
			}
		if (Object.keys(updateData.newValues).length !== 0) {
			await updateCharacter(updateData).unwrap()
		}
	}

	return (
		<div className='flex w-full h-min'>
			<CheckBox
				bonusValue={currentCharacterInfo.modifiers.bonuses.analysisBonus}
				updatingField={'analysisBonus'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<Input
				inputValue={analysis}
				changeInputValue={changeAnalysis}
				updatingField={'analysis'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<span className='font-bold'>Анализ</span>
		</div>
	)
}
