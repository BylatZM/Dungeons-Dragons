import { useState, FC, useEffect } from 'react'
import { Input } from '../../../ability/Input'
import { CheckBox } from '../../../ability/CheckBox'
import { useTypedSelector } from '../../../../../../../../hooks/useTypedSelection'
import { useActions } from '../../../../../../../../hooks/useActions'
import { IUpdatingFields } from '../../../../../../../../../types'

interface IProps {
	makeUpdateRequest: (updatingField: IUpdatingFields) => Promise<void>
}

export const Fraud: FC<IProps> = ({ makeUpdateRequest }) => {
	const { currentCharacterInfo } = useTypedSelector(state => state.Character)
	const { CharacterSaveApiResponse } = useActions()
	const [fraud, changeFraud] = useState(
		currentCharacterInfo.modifiers.fraud.toString()
	)

	useEffect(() => {
		if (fraud !== currentCharacterInfo.modifiers.fraud.toString())
			CharacterSaveApiResponse({
				...currentCharacterInfo,
				modifiers: {
					...currentCharacterInfo.modifiers,
					fraud: isNaN(parseInt(fraud)) ? 0 : parseInt(fraud)
				}
			})
	}, [fraud])

	return (
		<div className='flex w-full h-min'>
			<CheckBox changeInputValue={changeFraud} />
			<Input
				inputValue={fraud}
				changeInputValue={changeFraud}
				updatingField={'fraud'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<span className='font-bold'>Обман</span>
		</div>
	)
}
