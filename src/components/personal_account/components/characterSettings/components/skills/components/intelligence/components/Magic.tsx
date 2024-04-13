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

export const Magic: FC<IProps> = ({ calculateNewValueConsiderBonus }) => {
	const { currentCharacterInfo, isInitializedData } = useTypedSelector(
		state => state.Character
	)
	const [updateCharacter] = useUpdateCharacterMutation()
	const { CharacterSaveApiResponse } = useActions()
	const [magic, changeMagic] = useState('0')

	useEffect(() => {
		if (isInitializedData)
			changeMagic(currentCharacterInfo.modifiers.magic.toString())
	}, [isInitializedData])

	useEffect(() => {
		if (isNaN(parseInt(magic)) || !isInitializedData) return

		CharacterSaveApiResponse({
			...currentCharacterInfo,
			modifiers: {
				...currentCharacterInfo.modifiers,
				magic: parseInt(magic)
			}
		})
	}, [magic])

	const makeUpdateRequest = async (
		updatingField: IUpdatingFields,
		new_value: number
	) => {
		let updateData: ICharacterUpdate = {
			characterId: currentCharacterInfo.id,
			newValues: {}
		}
		if (updatingField === 'magicBonus') {
			const newMagicValue = calculateNewValueConsiderBonus(magic, new_value)
			changeMagic(newMagicValue)
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					magicBonus: new_value,
					magic: parseInt(newMagicValue)
				}
			}
		}
		if (updatingField === 'magic')
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					magic: new_value
				}
			}
		if (Object.keys(updateData.newValues).length !== 0) {
			await updateCharacter(updateData).unwrap()
		}
	}

	return (
		<div className='flex w-full h-min'>
			<CheckBox
				bonusValue={currentCharacterInfo.modifiers.bonuses.magicBonus}
				updatingField={'magicBonus'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<Input
				inputValue={magic}
				changeInputValue={changeMagic}
				updatingField={'magic'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<span className='font-bold'>Магия</span>
		</div>
	)
}
