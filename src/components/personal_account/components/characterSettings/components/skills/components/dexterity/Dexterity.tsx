import { FC } from 'react'
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

interface IProps {
	calculateNewValueConsiderBonus: (
		modifierValue: string,
		bonusValue: number
	) => string
}

export const Dexterity: FC<IProps> = ({ calculateNewValueConsiderBonus }) => {
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
				<Acrobatics
					calculateNewValueConsiderBonus={calculateNewValueConsiderBonus}
				/>
				<SleightOfHand
					calculateNewValueConsiderBonus={calculateNewValueConsiderBonus}
				/>
				<Stealth
					calculateNewValueConsiderBonus={calculateNewValueConsiderBonus}
				/>
			</div>
		</SkillWrapper>
	)
}
