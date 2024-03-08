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

export const Analysis: FC<IProps> = ({ makeUpdateRequest }) => {
	const { currentCharacterInfo, isInitializedData } = useTypedSelector(
		state => state.Character
	)
	const { CharacterSaveApiResponse } = useActions()
	const [analysis, changeAnalysis] = useState('0')

	useEffect(() => {
		if (isInitializedData)
			changeAnalysis(currentCharacterInfo.modifiers.analysis.toString())
	}, [isInitializedData])

	useEffect(() => {
		if (isNaN(parseInt(analysis)) || !isInitializedData) return

		CharacterSaveApiResponse({
			...currentCharacterInfo,
			modifiers: {
				...currentCharacterInfo.modifiers,
				analysis: parseInt(analysis)
			}
		})
	}, [analysis])

	return (
		<div className='flex w-full h-min'>
			<CheckBox
				inputValue={analysis}
				changeInputValue={changeAnalysis}
				updatingField={'analysis'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<Input
				inputValue={analysis}
				changeInputValue={changeAnalysis}
				updatingField={'analysis'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<span className='font-bold'>Анализ</span>
		</div>
	)
}
