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

export const SleightOfHand: FC<IProps> = ({
	calculateNewValueConsiderBonus
}) => {
	const { currentCharacterInfo, isInitializedData } = useTypedSelector(
		state => state.Character
	)
	const [updateCharacter] = useUpdateCharacterMutation()
	const { CharacterSaveApiResponse } = useActions()
	const [sleightOfHand, changeSleightOfHand] = useState('0')

	useEffect(() => {
		if (isInitializedData)
			changeSleightOfHand(
				currentCharacterInfo.modifiers.sleightOfHand.toString()
			)
	}, [isInitializedData])

	useEffect(() => {
		if (isNaN(parseInt(sleightOfHand)) || !isInitializedData) return

		CharacterSaveApiResponse({
			...currentCharacterInfo,
			modifiers: {
				...currentCharacterInfo.modifiers,
				sleightOfHand: parseInt(sleightOfHand)
			}
		})
	}, [sleightOfHand])

	const makeUpdateRequest = async (
		updatingField: IUpdatingFields,
		new_value: number
	) => {
		let updateData: ICharacterUpdate = {
			characterId: currentCharacterInfo.id,
			newValues: {}
		}
		if (updatingField === 'sleightOfHand')
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					sleightOfHand: new_value
				}
			}
		if (updatingField === 'sleightOfHandBonus') {
			const newSleightOfHandValue = calculateNewValueConsiderBonus(
				sleightOfHand,
				new_value
			)
			changeSleightOfHand(newSleightOfHandValue)
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					sleightOfHandBonus: new_value,
					sleightOfHand: parseInt(newSleightOfHandValue)
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
				bonusValue={currentCharacterInfo.modifiers.bonuses.sleightOfHandBonus}
				updatingField={'sleightOfHandBonus'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<Input
				inputValue={sleightOfHand}
				changeInputValue={changeSleightOfHand}
				updatingField={'sleightOfHand'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<span className='font-bold'>Ловкость рук</span>
		</div>
	)
}
