import { Performance } from './components/Performance'
import { Intimidation } from './components/Intimidation'
import { Fraud } from './components/Fraud'
import { Conviction } from './components/Conviction'
import { GeneralInput } from '../GeneralInput'
import { FC, useEffect, useState } from 'react'
import { SkillWrapper } from '../SkillWrapper'
import {
	ICharacterInfo,
	ICharacterUpdate,
	IUpdatingFields
} from '../../../../../../../../types'
import { useTypedSelector } from '../../../../../../../hooks/useTypedSelection'
import { useActions } from '../../../../../../../hooks/useActions'
import { useUpdateCharacterMutation } from '../../../../../../../../store/api/characterApiSlice'

interface IProps {
	lastCharacterInfo: ICharacterInfo | null
}

export const Charisma: FC<IProps> = ({ lastCharacterInfo }) => {
	const { currentCharacterInfo } = useTypedSelector(state => state.Character)
	const { CharacterSaveApiResponse } = useActions()
	const [charisma, changeCharisma] = useState(
		currentCharacterInfo.charisma.toString()
	)
	const [updateCharacter] = useUpdateCharacterMutation()

	useEffect(() => {
		if (charisma !== currentCharacterInfo.charisma.toString())
			CharacterSaveApiResponse({
				...currentCharacterInfo,
				charisma: isNaN(parseInt(charisma)) ? 0 : parseInt(charisma)
			})
	}, [charisma])

	const makeUpdateRequest = async (updatingField: IUpdatingFields) => {
		let updateData: ICharacterUpdate = {
			characterId: currentCharacterInfo.id,
			newValues: {}
		}
		if (
			updatingField === 'performance' &&
			lastCharacterInfo &&
			lastCharacterInfo.modifiers.performance !==
				currentCharacterInfo.modifiers.performance
		)
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					performance: currentCharacterInfo.modifiers.performance
				}
			}
		console.log(lastCharacterInfo ? lastCharacterInfo.charisma : '')
		console.log(currentCharacterInfo.charisma)
		if (
			updatingField === 'charisma' &&
			lastCharacterInfo &&
			lastCharacterInfo.charisma !== currentCharacterInfo.charisma
		)
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					charisma: currentCharacterInfo.charisma
				}
			}
		if (
			updatingField === 'intimidation' &&
			lastCharacterInfo &&
			lastCharacterInfo.modifiers.intimidation !==
				currentCharacterInfo.modifiers.intimidation
		)
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					intimidation: currentCharacterInfo.modifiers.intimidation
				}
			}
		if (
			updatingField === 'fraud' &&
			lastCharacterInfo &&
			lastCharacterInfo.modifiers.fraud !== currentCharacterInfo.modifiers.fraud
		)
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					fraud: currentCharacterInfo.modifiers.fraud
				}
			}
		if (
			updatingField === 'conviction' &&
			lastCharacterInfo &&
			lastCharacterInfo.modifiers.conviction !==
				currentCharacterInfo.modifiers.conviction
		)
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					conviction: currentCharacterInfo.modifiers.conviction
				}
			}
		if (Object.keys(updateData.newValues).length !== 0) {
			await updateCharacter(updateData).unwrap()
		}
	}

	return (
		<SkillWrapper>
			<div className='flex justify-between mt-4'>
				<span className='text-xl font-bold text-white'>Харизма</span>
				<GeneralInput
					inputValue={charisma}
					changeInputValue={changeCharisma}
					updatingField={'charisma'}
					makeUpdateRequest={makeUpdateRequest}
				/>
			</div>
			<div
				className='flex flex-col gap-y-2 pt-2 pl-2 w-full h-fit'
				style={{ color: '#dedede' }}
			>
				<Performance makeUpdateRequest={makeUpdateRequest} />
				<Intimidation makeUpdateRequest={makeUpdateRequest} />
				<Fraud makeUpdateRequest={makeUpdateRequest} />
				<Conviction makeUpdateRequest={makeUpdateRequest} />
			</div>
		</SkillWrapper>
	)
}
