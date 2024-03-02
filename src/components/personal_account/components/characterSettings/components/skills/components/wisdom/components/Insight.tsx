import { FC, useEffect, useState } from 'react'
import { CheckBox } from '../../../ability/CheckBox'
import { Input } from '../../../ability/Input'
import { useTypedSelector } from '../../../../../../../../hooks/useTypedSelection'
import { useActions } from '../../../../../../../../hooks/useActions'
import { IUpdatingFields } from '../../../../../../../../../types'

interface IProps {
	makeUpdateRequest: (updatingField: IUpdatingFields) => Promise<void>
}

export const Insight: FC<IProps> = ({ makeUpdateRequest }) => {
	const { currentCharacterInfo } = useTypedSelector(state => state.Character)
	const { CharacterSaveApiResponse } = useActions()
	const [insight, changeInsight] = useState(
		currentCharacterInfo.modifiers.insight.toString()
	)

	useEffect(() => {
		if (insight !== currentCharacterInfo.modifiers.insight.toString())
			CharacterSaveApiResponse({
				...currentCharacterInfo,
				modifiers: {
					...currentCharacterInfo.modifiers,
					insight: isNaN(parseInt(insight)) ? 0 : parseInt(insight)
				}
			})
	}, [insight])

	return (
		<div className='flex items-center w-full h-min'>
			<CheckBox changeInputValue={changeInsight} />
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
