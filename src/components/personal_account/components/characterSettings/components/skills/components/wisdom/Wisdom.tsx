import { Perception } from './components/Perception'
import { Survival } from './components/Survival'
import { Medicine } from './components/Medicine'
import { Insight } from './components/Insight'
import { AnimalCare } from './components/AnimalCare'
import { GeneralInput } from '../GeneralInput'
import { SkillWrapper } from '../SkillWrapper'
import {
	ICharacterUpdate,
	IUpdatingFields
} from '../../../../../../../../types'
import { useTypedSelector } from '../../../../../../../hooks/useTypedSelection'
import { useActions } from '../../../../../../../hooks/useActions'
import { useUpdateCharacterMutation } from '../../../../../../../../store/api/characterApiSlice'

export const Wisdom = () => {
	const { currentCharacterInfo } = useTypedSelector(state => state.Character)
	const { CharacterSaveApiResponse } = useActions()
	const [updateCharacter] = useUpdateCharacterMutation()

	const updateWisdom = (value: number) => {
		CharacterSaveApiResponse({
			...currentCharacterInfo,
			wisdom: value
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
		if (updatingField === 'wisdom')
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					wisdom: new_value
				}
			}
		if (updatingField === 'perception')
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					perception: new_value
				}
			}
		if (updatingField === 'survival')
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					survival: new_value
				}
			}
		if (updatingField === 'medicine')
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					medicine: new_value
				}
			}
		if (updatingField === 'insight')
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					insight: new_value
				}
			}
		if (updatingField === 'animalCare')
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					animalCare: new_value
				}
			}
		if (Object.keys(updateData.newValues).length !== 0) {
			await updateCharacter(updateData).unwrap()
		}
	}

	return (
		<SkillWrapper>
			<div className='flex justify-between mt-4'>
				<span className='text-xl font-bold text-white'>Мудрость</span>
				<GeneralInput
					inputValue={currentCharacterInfo.wisdom.toString()}
					changeInputValue={updateWisdom}
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
