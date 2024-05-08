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

export const Stealth: FC<IProps> = ({ calculateNewValueConsiderBonus }) => {
	const { currentCharacterInfo, isInitializedData } = useTypedSelector(
		state => state.Character
	)
	const [updateCharacter] = useUpdateCharacterMutation()
	const { CharacterSaveApiResponse } = useActions()
	const [stealth, changeStealth] = useState('0')

	useEffect(() => {
		if (isInitializedData)
			changeStealth(currentCharacterInfo.modifiers.stealth.toString())
	}, [isInitializedData])

	useEffect(() => {
		if (isNaN(parseInt(stealth)) || !isInitializedData) return

		CharacterSaveApiResponse({
			...currentCharacterInfo,
			modifiers: {
				...currentCharacterInfo.modifiers,
				stealth: parseInt(stealth)
			}
		})
	}, [stealth])

	const makeUpdateRequest = async (
		updatingField: IUpdatingFields,
		new_value: number
	) => {
		let updateData: ICharacterUpdate = {
			characterId: currentCharacterInfo.id,
			newValues: {}
		}
		if (updatingField === 'stealth')
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					stealth: new_value
				}
			}
		if (updatingField === 'stealthBonus') {
			const newStealthValue = calculateNewValueConsiderBonus(stealth, new_value)
			changeStealth(newStealthValue)
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					stealthBonus: new_value,
					stealth: parseInt(newStealthValue)
				}
			}
		}
		if (Object.keys(updateData.newValues).length !== 0) {
			await updateCharacter(updateData).unwrap()
		}
	}

	return (
		<div className='flex items-center w-full h-[50px]'>
			<CheckBox
				bonusValue={currentCharacterInfo.modifiers.bonuses.stealthBonus}
				updatingField={'stealthBonus'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<Input
				inputValue={stealth}
				changeInputValue={changeStealth}
				updatingField={'stealth'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<span className='font-bold'>Скрытность</span>
		</div>
	)
}
