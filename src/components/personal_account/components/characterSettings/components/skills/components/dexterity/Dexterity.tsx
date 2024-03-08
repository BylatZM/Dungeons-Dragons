import { useUpdateCharacterMutation } from '../../../../../../../../store/api/characterApiSlice'
import {
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

export const Dexterity = () => {
	const { currentCharacterInfo } = useTypedSelector(state => state.Character)
	const { CharacterSaveApiResponse } = useActions()
	const [updateCharacter] = useUpdateCharacterMutation()

	const updateDexterity = (value: number) => {
		CharacterSaveApiResponse({
			...currentCharacterInfo,
			dexterity: value
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
		if (updatingField === 'dexterity')
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					dexterity: new_value
				}
			}
		if (updatingField === 'acrobatics')
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					acrobatics: new_value
				}
			}
		if (updatingField === 'sleightOfHand')
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					sleightOfHand: new_value
				}
			}
		if (updatingField === 'stealth')
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					stealth: new_value
				}
			}
		if (Object.keys(updateData.newValues).length !== 0) {
			await updateCharacter(updateData).unwrap()
		}
	}

	return (
		<SkillWrapper>
			<div className='flex justify-between mt-4'>
				<span className='text-xl font-bold text-white'>Ловкость</span>
				<GeneralInput
					inputValue={currentCharacterInfo.dexterity.toString()}
					changeInputValue={updateDexterity}
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
