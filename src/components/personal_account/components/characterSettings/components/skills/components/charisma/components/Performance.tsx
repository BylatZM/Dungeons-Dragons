import { FC, useEffect, useState } from 'react'
import { Input } from '../../../ability/Input'
import { CheckBox } from '../../../ability/CheckBox'
import { useTypedSelector } from '../../../../../../../../hooks/useTypedSelection'
import { useActions } from '../../../../../../../../hooks/useActions'
import { IUpdatingFields } from '../../../../../../../../../types'

interface IProps {
	makeUpdateRequest: (
		updatingField: IUpdatingFields,
		new_value: number
	) => Promise<void>
}

export const Performance: FC<IProps> = ({ makeUpdateRequest }) => {
	const { currentCharacterInfo, isInitializedData } = useTypedSelector(
		state => state.Character
	)

	const { CharacterSaveApiResponse } = useActions()
	const [performance, changePerformance] = useState('0')

	useEffect(() => {
		if (isInitializedData)
			changePerformance(currentCharacterInfo.modifiers.athletics.toString())
	}, [isInitializedData])

	useEffect(() => {
		if (isNaN(parseInt(performance)) || !isInitializedData) return

		CharacterSaveApiResponse({
			...currentCharacterInfo,
			modifiers: {
				...currentCharacterInfo.modifiers,
				performance: parseInt(performance)
			}
		})
	}, [performance])

	return (
		<div className='flex items-center w-full h-min'>
			<CheckBox
				inputValue={performance}
				changeInputValue={changePerformance}
				updatingField={'performance'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<Input
				inputValue={performance}
				changeInputValue={changePerformance}
				updatingField={'performance'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<span className='font-bold text-left'>
				Выступле-
				<br />
				ние
			</span>
		</div>
	)
}
