import { FC, useEffect, useState } from 'react'
import { CheckBox } from '../../../ability/CheckBox'
import { Input } from '../../../ability/Input'
import { useTypedSelector } from '../../../../../../../../hooks/useTypedSelection'
import {
	ICharacterUpdate,
	IUpdatingFields
} from '../../../../../../../../../types'
import { useActions } from '../../../../../../../../hooks/useActions'
import { useUpdateCharacterMutation } from '../../../../../../../../../store/api/characterApiSlice'

interface IProps {
	calculateNewValueConsiderBonus: (
		modifierValue: string,
		bonusValue: number
	) => string
}

export const Perception: FC<IProps> = ({ calculateNewValueConsiderBonus }) => {
	const { currentCharacterInfo, isInitializedData } = useTypedSelector(
		state => state.Character
	)
	const [updateCharacter] = useUpdateCharacterMutation()
	const { CharacterSaveApiResponse } = useActions()
	const [perception, changePerception] = useState('0')

	useEffect(() => {
		if (isInitializedData)
			changePerception(currentCharacterInfo.modifiers.perception.toString())
	}, [isInitializedData])

	useEffect(() => {
		if (isNaN(parseInt(perception)) || !isInitializedData) return

		CharacterSaveApiResponse({
			...currentCharacterInfo,
			modifiers: {
				...currentCharacterInfo.modifiers,
				perception: parseInt(perception)
			}
		})
	}, [perception])

	const makeUpdateRequest = async (
		updatingField: IUpdatingFields,
		new_value: number
	) => {
		let updateData: ICharacterUpdate = {
			characterId: currentCharacterInfo.id,
			newValues: {}
		}
		if (updatingField === 'perception')
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					perception: new_value
				}
			}
		if (updatingField === 'perceptionBonus') {
			const newPerceptionValue = calculateNewValueConsiderBonus(
				perception,
				new_value
			)
			changePerception(newPerceptionValue)
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					perceptionBonus: new_value,
					perception: parseInt(newPerceptionValue)
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
				bonusValue={currentCharacterInfo.modifiers.bonuses.perceptionBonus}
				updatingField={'perceptionBonus'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<Input
				inputValue={perception}
				changeInputValue={changePerception}
				updatingField={'perception'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<span className='font-bold text-left'>
				Воспри-
				<br />
				ятие
			</span>
		</div>
	)
}
