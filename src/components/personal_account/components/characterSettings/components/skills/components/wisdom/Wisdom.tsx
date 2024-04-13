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
import { FC } from 'react'

interface IProps {
	calculateNewValueConsiderBonus: (
		modifierValue: string,
		bonusValue: number
	) => string
}

export const Wisdom: FC<IProps> = ({ calculateNewValueConsiderBonus }) => {
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
				<Perception
					calculateNewValueConsiderBonus={calculateNewValueConsiderBonus}
				/>
				<Survival
					calculateNewValueConsiderBonus={calculateNewValueConsiderBonus}
				/>
				<Medicine
					calculateNewValueConsiderBonus={calculateNewValueConsiderBonus}
				/>
				<Insight
					calculateNewValueConsiderBonus={calculateNewValueConsiderBonus}
				/>
				<AnimalCare
					calculateNewValueConsiderBonus={calculateNewValueConsiderBonus}
				/>
			</div>
		</SkillWrapper>
	)
}
