import { FC, useEffect, useState } from 'react'
import { Input } from '../../../ability/Input'
import { CheckBox } from '../../../ability/CheckBox'
import { IUpdatingFields } from '../../../../../../../../../types'
import { useTypedSelector } from '../../../../../../../../hooks/useTypedSelection'
import { useActions } from '../../../../../../../../hooks/useActions'

interface IProps {
	makeUpdateRequest: (
		updatingField: IUpdatingFields,
		new_value: number
	) => Promise<void>
}

export const History: FC<IProps> = ({ makeUpdateRequest }) => {
	const { currentCharacterInfo, isInitializedData } = useTypedSelector(
		state => state.Character
	)
	const { CharacterSaveApiResponse } = useActions()
	const [history, changeHistory] = useState('0')

	useEffect(() => {
		if (isInitializedData)
			changeHistory(currentCharacterInfo.modifiers.history.toString())
	}, [isInitializedData])

	useEffect(() => {
		if (isNaN(parseInt(history)) || !isInitializedData) return

		CharacterSaveApiResponse({
			...currentCharacterInfo,
			modifiers: {
				...currentCharacterInfo.modifiers,
				history: parseInt(history)
			}
		})
	}, [history])

	return (
		<div className='flex w-full h-min'>
			<CheckBox
				inputValue={history}
				changeInputValue={changeHistory}
				updatingField={'history'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<Input
				inputValue={history}
				changeInputValue={changeHistory}
				updatingField={'history'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<span className='font-bold'>История</span>
		</div>
	)
}
