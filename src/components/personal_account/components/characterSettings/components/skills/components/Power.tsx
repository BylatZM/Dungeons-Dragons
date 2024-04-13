import { FC, useEffect, useState } from 'react'
import { CheckBox } from '../ability/CheckBox'
import { Input } from '../ability/Input'
import { GeneralInput } from './GeneralInput'
import { SkillWrapper } from './SkillWrapper'
import { ICharacterUpdate, IUpdatingFields } from '../../../../../../../types'
import { useTypedSelector } from '../../../../../../hooks/useTypedSelection'
import { useActions } from '../../../../../../hooks/useActions'
import { useUpdateCharacterMutation } from '../../../../../../../store/api/characterApiSlice'

interface IProps {
	calculateNewValueConsiderBonus: (
		modifierValue: string,
		bonusValue: number
	) => string
}

export const Power: FC<IProps> = ({ calculateNewValueConsiderBonus }) => {
	const { currentCharacterInfo, isInitializedData } = useTypedSelector(
		state => state.Character
	)

	const { CharacterSaveApiResponse } = useActions()
	const [updateCharacter] = useUpdateCharacterMutation()
	const [athletics, changeAthletics] = useState('0')

	useEffect(() => {
		if (isInitializedData)
			changeAthletics(currentCharacterInfo.modifiers.athletics.toString())
	}, [isInitializedData])

	const updateStrength = (value: number) => {
		CharacterSaveApiResponse({
			...currentCharacterInfo,
			strength: value
		})
	}

	useEffect(() => {
		if (isNaN(parseInt(athletics)) || !isInitializedData) return

		CharacterSaveApiResponse({
			...currentCharacterInfo,
			modifiers: {
				...currentCharacterInfo.modifiers,
				athletics: parseInt(athletics)
			}
		})
	}, [athletics])

	const makeUpdateRequest = async (
		updatingField: IUpdatingFields,
		new_value: number
	) => {
		let updateData: ICharacterUpdate = {
			characterId: currentCharacterInfo.id,
			newValues: {}
		}
		if (updatingField === 'athleticsBonus') {
			const newAthleticsValue = calculateNewValueConsiderBonus(
				athletics,
				new_value
			)
			changeAthletics(newAthleticsValue)
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					athleticsBonus: new_value,
					athletics: parseInt(newAthleticsValue)
				}
			}
		}
		if (updatingField === 'strength')
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					strength: new_value
				}
			}
		if (updatingField === 'athletics')
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					athletics: new_value
				}
			}
		if (Object.keys(updateData.newValues).length !== 0) {
			await updateCharacter(updateData).unwrap()
		}
	}

	return (
		<SkillWrapper>
			<div className='flex justify-between mt-4'>
				<span className='font-bold text-xl text-white'>Сила</span>
				<GeneralInput
					inputValue={currentCharacterInfo.strength.toString()}
					changeInputValue={updateStrength}
					updatingField={'strength'}
					makeUpdateRequest={makeUpdateRequest}
				/>
			</div>
			<div className='flex w-full h-min' style={{ color: '#dedede' }}>
				<CheckBox
					bonusValue={currentCharacterInfo.modifiers.bonuses.athleticsBonus}
					updatingField={'athleticsBonus'}
					makeUpdateRequest={makeUpdateRequest}
				/>
				<Input
					inputValue={athletics}
					changeInputValue={changeAthletics}
					updatingField={'athletics'}
					makeUpdateRequest={makeUpdateRequest}
				/>
				<span className='font-bold'>Атлетика</span>
			</div>
		</SkillWrapper>
	)
}
