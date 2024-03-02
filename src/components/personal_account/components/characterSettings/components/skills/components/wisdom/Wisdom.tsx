import { Perception } from './components/Perception'
import { Survival } from './components/Survival'
import { Medicine } from './components/Medicine'
import { Insight } from './components/Insight'
import { AnimalCare } from './components/AnimalCare'
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

export const Wisdom: FC<IProps> = ({ lastCharacterInfo }) => {
	const { currentCharacterInfo } = useTypedSelector(state => state.Character)
	const { CharacterSaveApiResponse } = useActions()
	const [wisdom, changeWisdom] = useState(
		currentCharacterInfo.wisdom.toString()
	)
	const [updateCharacter] = useUpdateCharacterMutation()

	const makeUpdateRequest = async (updatingField: IUpdatingFields) => {
		let updateData: ICharacterUpdate = {
			characterId: currentCharacterInfo.id,
			newValues: {}
		}
		if (
			updatingField === 'wisdom' &&
			lastCharacterInfo &&
			lastCharacterInfo.wisdom !== currentCharacterInfo.wisdom
		)
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					wisdom: currentCharacterInfo.wisdom
				}
			}
		if (
			updatingField === 'perception' &&
			lastCharacterInfo &&
			lastCharacterInfo.modifiers.perception !==
				currentCharacterInfo.modifiers.perception
		)
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					perception: currentCharacterInfo.modifiers.perception
				}
			}
		if (
			updatingField === 'survival' &&
			lastCharacterInfo &&
			lastCharacterInfo.modifiers.survival !==
				currentCharacterInfo.modifiers.survival
		)
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					survival: currentCharacterInfo.modifiers.survival
				}
			}
		if (
			updatingField === 'medicine' &&
			lastCharacterInfo &&
			lastCharacterInfo.modifiers.medicine !==
				currentCharacterInfo.modifiers.medicine
		)
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					medicine: currentCharacterInfo.modifiers.medicine
				}
			}
		if (
			updatingField === 'insight' &&
			lastCharacterInfo &&
			lastCharacterInfo.modifiers.insight !==
				currentCharacterInfo.modifiers.insight
		)
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					insight: currentCharacterInfo.modifiers.insight
				}
			}
		if (
			updatingField === 'animalCare' &&
			lastCharacterInfo &&
			lastCharacterInfo.modifiers.animalCare !==
				currentCharacterInfo.modifiers.animalCare
		)
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					animalCare: currentCharacterInfo.modifiers.animalCare
				}
			}
		if (Object.keys(updateData.newValues).length !== 0) {
			await updateCharacter(updateData).unwrap()
		}
	}

	useEffect(() => {
		if (wisdom !== currentCharacterInfo.wisdom.toString())
			CharacterSaveApiResponse({
				...currentCharacterInfo,
				wisdom: isNaN(parseInt(wisdom)) ? 0 : parseInt(wisdom)
			})
	}, [wisdom])

	return (
		<SkillWrapper>
			<div className='flex justify-between mt-4'>
				<span className='text-xl font-bold text-white'>Мудрость</span>
				<GeneralInput
					inputValue={wisdom}
					changeInputValue={changeWisdom}
					updatingField={'wisdom'}
					makeUpdateRequest={makeUpdateRequest}
				/>
			</div>
			<div
				className='flex flex-col pt-2 pl-2 w-full h-fit'
				style={{ color: '#dedede' }}
			>
				<Perception makeUpdateRequest={makeUpdateRequest} />
				<Survival makeUpdateRequest={makeUpdateRequest} />
				<Medicine makeUpdateRequest={makeUpdateRequest} />
				<Insight makeUpdateRequest={makeUpdateRequest} />
				<AnimalCare makeUpdateRequest={makeUpdateRequest} />
			</div>
		</SkillWrapper>
	)
}
