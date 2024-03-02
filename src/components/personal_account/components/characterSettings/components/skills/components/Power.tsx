import { FC, useEffect, useState } from 'react'
import { CheckBox } from '../ability/CheckBox'
import { Input } from '../ability/Input'
import { GeneralInput } from './GeneralInput'
import { SkillWrapper } from './SkillWrapper'
import {
	ICharacterInfo,
	ICharacterUpdate,
	IUpdatingFields
} from '../../../../../../../types'
import { useTypedSelector } from '../../../../../../hooks/useTypedSelection'
import { useActions } from '../../../../../../hooks/useActions'
import { useUpdateCharacterMutation } from '../../../../../../../store/api/characterApiSlice'

interface IProps {
	lastCharacterInfo: ICharacterInfo | null
}

export const Power: FC<IProps> = ({ lastCharacterInfo }) => {
	const { currentCharacterInfo } = useTypedSelector(state => state.Character)
	const { CharacterSaveApiResponse } = useActions()
	const [updateCharacter] = useUpdateCharacterMutation()

	const [strength, changeStrength] = useState(
		currentCharacterInfo.strength.toString()
	)
	const [athletics, changeAthletics] = useState(
		currentCharacterInfo.modifiers.athletics.toString()
	)

	useEffect(() => {
		if (strength !== currentCharacterInfo.strength.toString())
			CharacterSaveApiResponse({
				...currentCharacterInfo,
				strength: isNaN(parseInt(strength)) ? 0 : parseInt(strength)
			})
		if (athletics !== currentCharacterInfo.modifiers.athletics.toString())
			CharacterSaveApiResponse({
				...currentCharacterInfo,
				modifiers: {
					...currentCharacterInfo.modifiers,
					athletics: isNaN(parseInt(athletics)) ? 0 : parseInt(athletics)
				}
			})
	}, [strength, athletics])

	const makeUpdateRequest = async (updatingField: IUpdatingFields) => {
		let updateData: ICharacterUpdate = {
			characterId: currentCharacterInfo.id,
			newValues: {}
		}
		if (
			updatingField === 'strength' &&
			lastCharacterInfo &&
			lastCharacterInfo.strength !== currentCharacterInfo.strength
		)
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					strength: currentCharacterInfo.strength
				}
			}
		if (
			updatingField === 'athletics' &&
			lastCharacterInfo &&
			lastCharacterInfo.modifiers.athletics !==
				currentCharacterInfo.modifiers.athletics
		)
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					athletics: currentCharacterInfo.modifiers.athletics
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
					inputValue={strength}
					changeInputValue={changeStrength}
					updatingField={'strength'}
					makeUpdateRequest={makeUpdateRequest}
				/>
			</div>
			<div className='flex w-full h-min' style={{ color: '#dedede' }}>
				<CheckBox changeInputValue={changeAthletics} />
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
