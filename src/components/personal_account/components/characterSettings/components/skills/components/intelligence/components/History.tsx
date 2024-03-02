import { FC, useEffect, useState } from 'react'
import { Input } from '../../../ability/Input'
import { CheckBox } from '../../../ability/CheckBox'
import { IUpdatingFields } from '../../../../../../../../../types'
import { useTypedSelector } from '../../../../../../../../hooks/useTypedSelection'
import { useActions } from '../../../../../../../../hooks/useActions'

interface IProps {
	makeUpdateRequest: (updatingField: IUpdatingFields) => Promise<void>
}

export const History: FC<IProps> = ({ makeUpdateRequest }) => {
	const { currentCharacterInfo } = useTypedSelector(state => state.Character)
	const { CharacterSaveApiResponse } = useActions()
	const [history, changeHistory] = useState(
		currentCharacterInfo.modifiers.history.toString()
	)

	useEffect(() => {
		if (history !== currentCharacterInfo.modifiers.history.toString())
			CharacterSaveApiResponse({
				...currentCharacterInfo,
				modifiers: {
					...currentCharacterInfo.modifiers,
					history: isNaN(parseInt(history)) ? 0 : parseInt(history)
				}
			})
	}, [history])

	return (
		<div className='flex w-full h-min'>
			<CheckBox changeInputValue={changeHistory} />
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
