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

export const Conviction: FC<IProps> = ({ calculateNewValueConsiderBonus }) => {
	const { currentCharacterInfo, isInitializedData } = useTypedSelector(
		state => state.Character
	)
	const [updateCharacter] = useUpdateCharacterMutation()
	const { CharacterSaveApiResponse } = useActions()
	const [conviction, changeConviction] = useState('0')

	useEffect(() => {
		if (isInitializedData)
			changeConviction(currentCharacterInfo.modifiers.conviction.toString())
	}, [isInitializedData])

	useEffect(() => {
		if (isNaN(parseInt(conviction)) || !isInitializedData) return

		CharacterSaveApiResponse({
			...currentCharacterInfo,
			modifiers: {
				...currentCharacterInfo.modifiers,
				conviction: parseInt(conviction)
			}
		})
	}, [conviction])

	const makeUpdateRequest = async (
		updatingField: IUpdatingFields,
		new_value: number
	) => {
		let updateData: ICharacterUpdate = {
			characterId: currentCharacterInfo.id,
			newValues: {}
		}
		if (updatingField === 'conviction')
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					conviction: new_value
				}
			}
		if (updatingField === 'convictionBonus') {
			const newConvictionValue = calculateNewValueConsiderBonus(
				conviction,
				new_value
			)
			changeConviction(newConvictionValue)
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					convictionBonus: new_value,
					conviction: parseInt(newConvictionValue)
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
				bonusValue={currentCharacterInfo.modifiers.bonuses.convictionBonus}
				updatingField={'convictionBonus'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<Input
				inputValue={conviction}
				changeInputValue={changeConviction}
				updatingField={'conviction'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<span className='font-bold'>Убеждение</span>
		</div>
	)
}
