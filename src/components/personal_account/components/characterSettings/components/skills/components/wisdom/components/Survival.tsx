import { FC, useEffect, useState } from 'react'
import { CheckBox } from '../../../ability/CheckBox'
import { Input } from '../../../ability/Input'
import { useActions } from '../../../../../../../../hooks/useActions'
import { useTypedSelector } from '../../../../../../../../hooks/useTypedSelection'
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

export const Survival: FC<IProps> = ({ calculateNewValueConsiderBonus }) => {
	const { currentCharacterInfo, isInitializedData } = useTypedSelector(
		state => state.Character
	)
	const [updateCharacter] = useUpdateCharacterMutation()
	const { CharacterSaveApiResponse } = useActions()
	const [survival, changeSurvival] = useState('0')

	useEffect(() => {
		if (isInitializedData)
			changeSurvival(currentCharacterInfo.modifiers.survival.toString())
	}, [isInitializedData])

	useEffect(() => {
		if (isNaN(parseInt(survival)) || !isInitializedData) return

		CharacterSaveApiResponse({
			...currentCharacterInfo,
			modifiers: {
				...currentCharacterInfo.modifiers,
				survival: parseInt(survival)
			}
		})
	}, [survival])

	const makeUpdateRequest = async (
		updatingField: IUpdatingFields,
		new_value: number
	) => {
		let updateData: ICharacterUpdate = {
			characterId: currentCharacterInfo.id,
			newValues: {}
		}
		if (updatingField === 'survival')
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					survival: new_value
				}
			}
		if (updatingField === 'survivalBonus') {
			const newSurvivalValue = calculateNewValueConsiderBonus(
				survival,
				new_value
			)
			changeSurvival(newSurvivalValue)
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					survivalBonus: new_value,
					survival: parseInt(newSurvivalValue)
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
				bonusValue={currentCharacterInfo.modifiers.bonuses.survivalBonus}
				updatingField={'survivalBonus'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<Input
				inputValue={survival}
				changeInputValue={changeSurvival}
				updatingField={'survival'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<span className='font-bold text-left'>
				Выжива-
				<br />
				ние
			</span>
		</div>
	)
}
