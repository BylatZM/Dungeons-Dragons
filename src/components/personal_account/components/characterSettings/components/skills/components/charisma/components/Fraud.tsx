import { useState, FC, useEffect } from 'react'
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

export const Fraud: FC<IProps> = ({ makeUpdateRequest }) => {
	const { currentCharacterInfo, isInitializedData } = useTypedSelector(
		state => state.Character
	)
	const { CharacterSaveApiResponse } = useActions()
	const [fraud, changeFraud] = useState('0')

	useEffect(() => {
		if (isInitializedData)
			changeFraud(currentCharacterInfo.modifiers.fraud.toString())
	}, [isInitializedData])

	useEffect(() => {
		if (isNaN(parseInt(fraud)) || !isInitializedData) return

		CharacterSaveApiResponse({
			...currentCharacterInfo,
			modifiers: {
				...currentCharacterInfo.modifiers,
				fraud: parseInt(fraud)
			}
		})
	}, [fraud])

	return (
		<div className='flex w-full h-min'>
			<CheckBox
				inputValue={fraud}
				changeInputValue={changeFraud}
				updatingField={'intimidation'}
				makeUpdateRequest={makeUpdateRequest}
			/>
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
