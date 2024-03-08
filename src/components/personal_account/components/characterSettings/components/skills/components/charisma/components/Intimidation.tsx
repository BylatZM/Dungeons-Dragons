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

export const Intimidation: FC<IProps> = ({ makeUpdateRequest }) => {
	const { currentCharacterInfo, isInitializedData } = useTypedSelector(
		state => state.Character
	)
	const { CharacterSaveApiResponse } = useActions()
	const [intimidation, changeIntimidation] = useState('0')

	useEffect(() => {
		if (isInitializedData)
			changeIntimidation(currentCharacterInfo.modifiers.intimidation.toString())
	}, [isInitializedData])

	useEffect(() => {
		if (isNaN(parseInt(intimidation)) || !isInitializedData) return

		CharacterSaveApiResponse({
			...currentCharacterInfo,
			modifiers: {
				...currentCharacterInfo.modifiers,
				intimidation: parseInt(intimidation)
			}
		})
	}, [intimidation])

	return (
		<div className='flex items-center w-full h-min'>
			<CheckBox
				inputValue={intimidation}
				changeInputValue={changeIntimidation}
				updatingField={'intimidation'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<Input
				inputValue={intimidation}
				changeInputValue={changeIntimidation}
				updatingField={'intimidation'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<span className='font-bold text-left'>
				Запугива-
				<br />
				ние
			</span>
		</div>
	)
}
