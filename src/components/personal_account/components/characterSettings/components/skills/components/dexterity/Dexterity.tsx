import { useUpdateCharacterMutation } from '../../../../../../../../store/api/characterApiSlice'
import {
	ICharacterInfo,
	ICharacterUpdate,
	IUpdatingFields
} from '../../../../../../../../types'
import { useActions } from '../../../../../../../hooks/useActions'
import { useTypedSelector } from '../../../../../../../hooks/useTypedSelection'
import { GeneralInput } from '../GeneralInput'
import { SkillWrapper } from '../SkillWrapper'
import { Acrobatics } from './components/Acrobatics'
import { SleightOfHand } from './components/SleightOfHand'
import { Stealth } from './components/Stealth'
import { FC, useEffect, useState } from 'react'

interface IProps {
	lastCharacterInfo: ICharacterInfo | null
}

export const Dexterity: FC<IProps> = ({ lastCharacterInfo }) => {
	const { currentCharacterInfo } = useTypedSelector(state => state.Character)
	const { CharacterSaveApiResponse } = useActions()
	const [dexterity, changeDexterity] = useState(
		currentCharacterInfo.dexterity.toString()
	)
	const [updateCharacter] = useUpdateCharacterMutation()

	const makeUpdateRequest = async (updatingField: IUpdatingFields) => {
		let updateData: ICharacterUpdate = {
			characterId: currentCharacterInfo.id,
			newValues: {}
		}
		if (
			updatingField === 'dexterity' &&
			lastCharacterInfo &&
			lastCharacterInfo.dexterity !== currentCharacterInfo.dexterity
		)
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					dexterity: currentCharacterInfo.dexterity
				}
			}
		if (
			updatingField === 'acrobatics' &&
			lastCharacterInfo &&
			lastCharacterInfo.modifiers.acrobatics !==
				currentCharacterInfo.modifiers.acrobatics
		)
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					acrobatics: currentCharacterInfo.modifiers.acrobatics
				}
			}
		if (
			updatingField === 'sleightOfHand' &&
			lastCharacterInfo &&
			lastCharacterInfo.modifiers.sleightOfHand !==
				currentCharacterInfo.modifiers.sleightOfHand
		)
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					sleightOfHand: currentCharacterInfo.modifiers.sleightOfHand
				}
			}
		if (
			updatingField === 'stealth' &&
			lastCharacterInfo &&
			lastCharacterInfo.modifiers.stealth !==
				currentCharacterInfo.modifiers.stealth
		)
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					stealth: currentCharacterInfo.modifiers.stealth
				}
			}
		if (Object.keys(updateData.newValues).length !== 0) {
			await updateCharacter(updateData).unwrap()
		}
	}

	useEffect(() => {
		if (dexterity !== currentCharacterInfo.dexterity.toString())
			CharacterSaveApiResponse({
				...currentCharacterInfo,
				dexterity: isNaN(parseInt(dexterity)) ? 0 : parseInt(dexterity)
			})
	}, [dexterity])

	return (
		<SkillWrapper>
			<div className='flex justify-between mt-4'>
				<span className='text-xl font-bold text-white'>Ловкость</span>
				<GeneralInput
					inputValue={dexterity}
					changeInputValue={changeDexterity}
					updatingField={'dexterity'}
					makeUpdateRequest={makeUpdateRequest}
				/>
			</div>
			<div className='flex flex-col w-full h-min' style={{ color: '#dedede' }}>
				<Acrobatics makeUpdateRequest={makeUpdateRequest} />
				<SleightOfHand makeUpdateRequest={makeUpdateRequest} />
				<Stealth makeUpdateRequest={makeUpdateRequest} />
			</div>
		</SkillWrapper>
	)
}
