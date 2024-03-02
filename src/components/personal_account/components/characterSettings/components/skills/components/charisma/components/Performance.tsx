import { FC, useEffect, useState } from 'react'
import { Input } from '../../../ability/Input'
import { CheckBox } from '../../../ability/CheckBox'
import { useTypedSelector } from '../../../../../../../../hooks/useTypedSelection'
import { useActions } from '../../../../../../../../hooks/useActions'
import { IUpdatingFields } from '../../../../../../../../../types'

interface IProps {
	makeUpdateRequest: (updatingField: IUpdatingFields) => Promise<void>
}

export const Performance: FC<IProps> = ({ makeUpdateRequest }) => {
	const { currentCharacterInfo } = useTypedSelector(state => state.Character)
	const { CharacterSaveApiResponse } = useActions()
	const [performance, changePerformance] = useState(
		currentCharacterInfo.modifiers.performance.toString()
	)

	useEffect(() => {
		if (performance !== currentCharacterInfo.modifiers.performance.toString())
			CharacterSaveApiResponse({
				...currentCharacterInfo,
				modifiers: {
					...currentCharacterInfo.modifiers,
					performance: isNaN(parseInt(performance)) ? 0 : parseInt(performance)
				}
			})
	}, [performance])

	return (
		<div className='flex items-center w-full h-min'>
			<CheckBox changeInputValue={changePerformance} />
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
