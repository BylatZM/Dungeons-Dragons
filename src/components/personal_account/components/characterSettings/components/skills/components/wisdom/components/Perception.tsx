import { FC, useEffect, useState } from 'react'
import { CheckBox } from '../../../ability/CheckBox'
import { Input } from '../../../ability/Input'
import { useTypedSelector } from '../../../../../../../../hooks/useTypedSelection'
import { IUpdatingFields } from '../../../../../../../../../types'
import { useActions } from '../../../../../../../../hooks/useActions'

interface IProps {
	makeUpdateRequest: (
		updatingField: IUpdatingFields,
		new_value: number
	) => Promise<void>
}

export const Perception: FC<IProps> = ({ makeUpdateRequest }) => {
	const { currentCharacterInfo, isInitializedData } = useTypedSelector(
		state => state.Character
	)
	const { CharacterSaveApiResponse } = useActions()
	const [perception, changePerception] = useState('0')

	useEffect(() => {
		if (isInitializedData)
			changePerception(currentCharacterInfo.modifiers.perception.toString())
	}, [isInitializedData])

	useEffect(() => {
		if (isNaN(parseInt(perception)) || !isInitializedData) return

		CharacterSaveApiResponse({
			...currentCharacterInfo,
			modifiers: {
				...currentCharacterInfo.modifiers,
				perception: parseInt(perception)
			}
		})
	}, [perception])

	return (
		<div className='flex items-center w-full h-min'>
			<CheckBox
				inputValue={perception}
				changeInputValue={changePerception}
				updatingField={'perception'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<Input
				inputValue={perception}
				changeInputValue={changePerception}
				updatingField={'perception'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<span className='font-bold text-left'>
				Воспри-
				<br />
				ятие
			</span>
		</div>
	)
}
