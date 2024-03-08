import { FC, useEffect, useState } from 'react'
import { CheckBox } from '../../../ability/CheckBox'
import { Input } from '../../../ability/Input'
import { useTypedSelector } from '../../../../../../../../hooks/useTypedSelection'
import { useActions } from '../../../../../../../../hooks/useActions'
import { IUpdatingFields } from '../../../../../../../../../types'

interface IProps {
	makeUpdateRequest: (
		updatingField: IUpdatingFields,
		new_value: number
	) => Promise<void>
}

export const Insight: FC<IProps> = ({ makeUpdateRequest }) => {
	const { currentCharacterInfo, isInitializedData } = useTypedSelector(
		state => state.Character
	)
	const { CharacterSaveApiResponse } = useActions()
	const [insight, changeInsight] = useState('0')

	useEffect(() => {
		if (isInitializedData)
			changeInsight(currentCharacterInfo.modifiers.insight.toString())
	}, [isInitializedData])

	useEffect(() => {
		if (isNaN(parseInt(insight)) || !isInitializedData) return

		CharacterSaveApiResponse({
			...currentCharacterInfo,
			modifiers: {
				...currentCharacterInfo.modifiers,
				insight: parseInt(insight)
			}
		})
	}, [insight])

	return (
		<div className='flex items-center w-full h-min'>
			<CheckBox
				inputValue={insight}
				changeInputValue={changeInsight}
				updatingField={'insight'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<Input
				inputValue={insight}
				changeInputValue={changeInsight}
				updatingField={'insight'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<span className='font-bold text-left'>
				Проница-
				<br />
				тельность
			</span>
		</div>
	)
}
