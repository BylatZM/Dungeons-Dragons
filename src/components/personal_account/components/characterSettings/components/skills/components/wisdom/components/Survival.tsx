import { FC, useEffect, useState } from 'react'
import { CheckBox } from '../../../ability/CheckBox'
import { Input } from '../../../ability/Input'
import { useActions } from '../../../../../../../../hooks/useActions'
import { useTypedSelector } from '../../../../../../../../hooks/useTypedSelection'
import { IUpdatingFields } from '../../../../../../../../../types'

interface IProps {
	makeUpdateRequest: (
		updatingField: IUpdatingFields,
		new_value: number
	) => Promise<void>
}

export const Survival: FC<IProps> = ({ makeUpdateRequest }) => {
	const { currentCharacterInfo, isInitializedData } = useTypedSelector(
		state => state.Character
	)
	const { CharacterSaveApiResponse } = useActions()
	const [survival, changeSurvival] = useState('0')

	useEffect(() => {
		if (isInitializedData)
			changeSurvival(currentCharacterInfo.modifiers.survival.toString())
	}, [isInitializedData])

	useEffect(() => {
		if (isNaN(parseInt(survival)) || !isInitializedData) return

		CharacterSaveApiResponse({
			...currentCharacterInfo,
			modifiers: {
				...currentCharacterInfo.modifiers,
				survival: parseInt(survival)
			}
		})
	}, [survival])

	return (
		<div className='flex items-center w-full h-min'>
			<CheckBox
				inputValue={survival}
				changeInputValue={changeSurvival}
				updatingField={'survival'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<Input
				inputValue={survival}
				changeInputValue={changeSurvival}
				updatingField={'survival'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<span className='font-bold text-left'>
				Выжива-
				<br />
				ние
			</span>
		</div>
	)
}
