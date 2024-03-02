import { Analysis } from './components/Analysis'
import { History } from './components/History'
import { Magic } from './components/Magic'
import { Nature } from './components/Nature'
import { Religion } from './components/Religion'
import { FC, useEffect, useState } from 'react'
import { SkillWrapper } from '../SkillWrapper'
import { GeneralInput } from '../GeneralInput'
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

export const Intelligence: FC<IProps> = ({ lastCharacterInfo }) => {
	const { currentCharacterInfo } = useTypedSelector(state => state.Character)
	const { CharacterSaveApiResponse } = useActions()
	const [intelligence, changeIntelligence] = useState(
		currentCharacterInfo.intelligence.toString()
	)
	const [updateCharacter] = useUpdateCharacterMutation()

	const makeUpdateRequest = async (updatingField: IUpdatingFields) => {
		let updateData: ICharacterUpdate = {
			characterId: currentCharacterInfo.id,
			newValues: {}
		}
		if (
			updatingField === 'intelligence' &&
			lastCharacterInfo &&
			lastCharacterInfo.intelligence !== currentCharacterInfo.intelligence
		)
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					intelligence: currentCharacterInfo.intelligence
				}
			}
		if (
			updatingField === 'analysis' &&
			lastCharacterInfo &&
			lastCharacterInfo.modifiers.analysis !==
				currentCharacterInfo.modifiers.analysis
		)
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					analysis: currentCharacterInfo.modifiers.analysis
				}
			}
		if (
			updatingField === 'history' &&
			lastCharacterInfo &&
			lastCharacterInfo.modifiers.history !==
				currentCharacterInfo.modifiers.history
		)
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					history: currentCharacterInfo.modifiers.history
				}
			}
		if (
			updatingField === 'magic' &&
			lastCharacterInfo &&
			lastCharacterInfo.modifiers.magic !== currentCharacterInfo.modifiers.magic
		)
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					magic: currentCharacterInfo.modifiers.magic
				}
			}
		if (
			updatingField === 'nature' &&
			lastCharacterInfo &&
			lastCharacterInfo.modifiers.nature !==
				currentCharacterInfo.modifiers.nature
		)
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					nature: currentCharacterInfo.modifiers.nature
				}
			}
		if (
			updatingField === 'religion' &&
			lastCharacterInfo &&
			lastCharacterInfo.modifiers.religion !==
				currentCharacterInfo.modifiers.religion
		)
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					religion: currentCharacterInfo.modifiers.religion
				}
			}
		if (Object.keys(updateData.newValues).length !== 0) {
			await updateCharacter(updateData).unwrap()
		}
	}

	useEffect(() => {
		if (intelligence !== currentCharacterInfo.intelligence.toString())
			CharacterSaveApiResponse({
				...currentCharacterInfo,
				intelligence: isNaN(parseInt(intelligence)) ? 0 : parseInt(intelligence)
			})
	}, [intelligence])

	return (
		<SkillWrapper>
			<div className='flex justify-between mt-4'>
				<span className='text-xl font-bold text-white'>Интеллект</span>
				<GeneralInput
					inputValue={intelligence}
					changeInputValue={changeIntelligence}
					updatingField={'intelligence'}
					makeUpdateRequest={makeUpdateRequest}
				/>
			</div>
			<div
				className='flex flex-col gap-y-2 w-full h-fit pl-2 pt-2'
				style={{ color: '#dedede' }}
			>
				<Analysis makeUpdateRequest={makeUpdateRequest} />
				<History makeUpdateRequest={makeUpdateRequest} />
				<Magic makeUpdateRequest={makeUpdateRequest} />
				<Nature makeUpdateRequest={makeUpdateRequest} />
				<Religion makeUpdateRequest={makeUpdateRequest} />
			</div>
		</SkillWrapper>
	)
}
