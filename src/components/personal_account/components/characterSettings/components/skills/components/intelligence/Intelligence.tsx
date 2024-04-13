import { Analysis } from './components/Analysis'
import { History } from './components/History'
import { Magic } from './components/Magic'
import { Nature } from './components/Nature'
import { Religion } from './components/Religion'
import { SkillWrapper } from '../SkillWrapper'
import { GeneralInput } from '../GeneralInput'
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

export const Intelligence: FC<IProps> = ({
	calculateNewValueConsiderBonus
}) => {
	const { currentCharacterInfo } = useTypedSelector(state => state.Character)
	const { CharacterSaveApiResponse } = useActions()
	const [updateCharacter] = useUpdateCharacterMutation()

	const updateIntelligence = (value: number) => {
		CharacterSaveApiResponse({
			...currentCharacterInfo,
			intelligence: value
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
		if (updatingField === 'intelligence')
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					intelligence: new_value
				}
			}
		if (Object.keys(updateData.newValues).length !== 0) {
			await updateCharacter(updateData).unwrap()
		}
	}

	return (
		<SkillWrapper>
			<div className='flex justify-between mt-4'>
				<span className='text-xl font-bold text-white'>Интеллект</span>
				<GeneralInput
					inputValue={currentCharacterInfo.intelligence.toString()}
					changeInputValue={updateIntelligence}
					updatingField={'intelligence'}
					makeUpdateRequest={makeUpdateRequest}
				/>
			</div>
			<div
				className='flex flex-col gap-y-2 w-full h-fit pl-2 pt-2'
				style={{ color: '#dedede' }}
			>
				<Analysis
					calculateNewValueConsiderBonus={calculateNewValueConsiderBonus}
				/>
				<History
					calculateNewValueConsiderBonus={calculateNewValueConsiderBonus}
				/>
				<Magic
					calculateNewValueConsiderBonus={calculateNewValueConsiderBonus}
				/>
				<Nature
					calculateNewValueConsiderBonus={calculateNewValueConsiderBonus}
				/>
				<Religion
					calculateNewValueConsiderBonus={calculateNewValueConsiderBonus}
				/>
			</div>
		</SkillWrapper>
	)
}
