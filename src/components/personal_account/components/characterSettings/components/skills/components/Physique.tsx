import { SkillWrapper } from './SkillWrapper'
import { GeneralInput } from './GeneralInput'
import { useTypedSelector } from '../../../../../../hooks/useTypedSelection'
import { useActions } from '../../../../../../hooks/useActions'
import { ICharacterUpdate, IUpdatingFields } from '../../../../../../../types'
import { useUpdateCharacterMutation } from '../../../../../../../store/api/characterApiSlice'

export const Physique = () => {
	const { currentCharacterInfo } = useTypedSelector(state => state.Character)
	const { CharacterSaveApiResponse } = useActions()
	const [updateCharacter] = useUpdateCharacterMutation()

	const updatePhysique = (value: number) => {
		CharacterSaveApiResponse({
			...currentCharacterInfo,
			physique: value
		})
	}

	const makeUpdateRequest = async (
		updatingField: IUpdatingFields,
		new_value: number
	) => {
		let updateData: ICharacterUpdate = {
			characterId: currentCharacterInfo.id,
			newValues: {}
		}
		if (updatingField === 'physique')
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					physique: new_value
				}
			}
		if (Object.keys(updateData.newValues).length !== 0) {
			await updateCharacter(updateData).unwrap()
		}
	}

	return (
		<SkillWrapper>
			<div className='flex justify-between mt-4 mb-1'>
				<span className='text-xl font-bold text-white'>Телосложение</span>
				<GeneralInput
					inputValue={currentCharacterInfo.physique.toString()}
					changeInputValue={updatePhysique}
					updatingField={'physique'}
					makeUpdateRequest={makeUpdateRequest}
				/>
			</div>
		</SkillWrapper>
	)
}
