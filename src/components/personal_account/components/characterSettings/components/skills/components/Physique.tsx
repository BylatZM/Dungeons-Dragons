import { FC, useEffect, useState } from 'react'
import { SkillWrapper } from './SkillWrapper'
import { GeneralInput } from './GeneralInput'
import { useTypedSelector } from '../../../../../../hooks/useTypedSelection'
import { useActions } from '../../../../../../hooks/useActions'
import {
	ICharacterInfo,
	ICharacterUpdate,
	IUpdatingFields
} from '../../../../../../../types'
import { useUpdateCharacterMutation } from '../../../../../../../store/api/characterApiSlice'

interface IProps {
	lastCharacterInfo: ICharacterInfo | null
}

export const Physique: FC<IProps> = ({ lastCharacterInfo }) => {
	const { currentCharacterInfo } = useTypedSelector(state => state.Character)
	const { CharacterSaveApiResponse } = useActions()
	const [physique, changePhysique] = useState(
		currentCharacterInfo.physique.toString()
	)
	const [updateCharacter] = useUpdateCharacterMutation()

	const makeUpdateRequest = async (updatingField: IUpdatingFields) => {
		let updateData: ICharacterUpdate = {
			characterId: currentCharacterInfo.id,
			newValues: {}
		}
		if (
			updatingField === 'physique' &&
			lastCharacterInfo &&
			lastCharacterInfo.physique !== currentCharacterInfo.physique
		)
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					physique: currentCharacterInfo.physique
				}
			}
		if (Object.keys(updateData.newValues).length !== 0) {
			await updateCharacter(updateData).unwrap()
		}
	}

	useEffect(() => {
		if (physique !== currentCharacterInfo.physique.toString())
			CharacterSaveApiResponse({
				...currentCharacterInfo,
				physique: isNaN(parseInt(physique)) ? 0 : parseInt(physique)
			})
	}, [physique])

	return (
		<SkillWrapper>
			<div className='flex justify-between mt-4 mb-1'>
				<span className='text-xl font-bold text-white'>Телосложение</span>
				<GeneralInput
					inputValue={physique}
					changeInputValue={changePhysique}
					updatingField={'physique'}
					makeUpdateRequest={makeUpdateRequest}
				/>
			</div>
		</SkillWrapper>
	)
}
