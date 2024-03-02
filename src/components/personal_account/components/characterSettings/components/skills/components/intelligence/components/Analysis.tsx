import { FC, useEffect, useState } from 'react'
import { Input } from '../../../ability/Input'
import { CheckBox } from '../../../ability/CheckBox'
import { IUpdatingFields } from '../../../../../../../../../types'
import { useTypedSelector } from '../../../../../../../../hooks/useTypedSelection'
import { useActions } from '../../../../../../../../hooks/useActions'

interface IProps {
	makeUpdateRequest: (updatingField: IUpdatingFields) => Promise<void>
}

export const Analysis: FC<IProps> = ({ makeUpdateRequest }) => {
	const { currentCharacterInfo } = useTypedSelector(state => state.Character)
	const { CharacterSaveApiResponse } = useActions()
	const [analysis, changeAnalysis] = useState(
		currentCharacterInfo.modifiers.analysis.toString()
	)

	useEffect(() => {
		if (analysis !== currentCharacterInfo.modifiers.analysis.toString())
			CharacterSaveApiResponse({
				...currentCharacterInfo,
				modifiers: {
					...currentCharacterInfo.modifiers,
					analysis: isNaN(parseInt(analysis)) ? 0 : parseInt(analysis)
				}
			})
	}, [analysis])

	return (
		<div className='flex w-full h-min'>
			<CheckBox changeInputValue={changeAnalysis} />
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
