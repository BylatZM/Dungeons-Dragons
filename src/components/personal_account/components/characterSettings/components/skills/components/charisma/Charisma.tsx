import { Performance } from './components/Performance'
import { Intimidation } from './components/Intimidation'
import { Fraud } from './components/Fraud'
import { Conviction } from './components/Conviction'
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

export const Charisma: FC<IProps> = ({ calculateNewValueConsiderBonus }) => {
	const { currentCharacterInfo } = useTypedSelector(state => state.Character)
	const { CharacterSaveApiResponse } = useActions()
	const [updateCharacter] = useUpdateCharacterMutation()

	const updateCharisma = (value: number) => {
		CharacterSaveApiResponse({
			...currentCharacterInfo,
			charisma: value
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
		if (updatingField === 'charisma')
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					charisma: new_value
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
					inputValue={currentCharacterInfo.charisma.toString()}
					changeInputValue={updateCharisma}
					updatingField={'charisma'}
					makeUpdateRequest={makeUpdateRequest}
				/>
			</div>
			<div
				className='flex flex-col gap-y-2 pt-2 pl-2 w-full h-fit'
				style={{ color: '#dedede' }}
			>
				<Performance
					calculateNewValueConsiderBonus={calculateNewValueConsiderBonus}
				/>
				<Intimidation
					calculateNewValueConsiderBonus={calculateNewValueConsiderBonus}
				/>
				<Fraud
					calculateNewValueConsiderBonus={calculateNewValueConsiderBonus}
				/>
				<Conviction
					calculateNewValueConsiderBonus={calculateNewValueConsiderBonus}
				/>
			</div>
		</SkillWrapper>
	)
}
