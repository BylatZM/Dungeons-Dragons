import { FC, useEffect, useState } from 'react'
import { Input } from '../../../ability/Input'
import { CheckBox } from '../../../ability/CheckBox'
import { IUpdatingFields } from '../../../../../../../../../types'
import { useTypedSelector } from '../../../../../../../../hooks/useTypedSelection'
import { useActions } from '../../../../../../../../hooks/useActions'

interface IProps {
	makeUpdateRequest: (updatingField: IUpdatingFields) => Promise<void>
}

export const Intimidation: FC<IProps> = ({ makeUpdateRequest }) => {
	const { currentCharacterInfo } = useTypedSelector(state => state.Character)
	const { CharacterSaveApiResponse } = useActions()
	const [intimidation, changeIntimidation] = useState(
		currentCharacterInfo.modifiers.intimidation.toString()
	)

	useEffect(() => {
		if (intimidation !== currentCharacterInfo.modifiers.intimidation.toString())
			CharacterSaveApiResponse({
				...currentCharacterInfo,
				modifiers: {
					...currentCharacterInfo.modifiers,
					intimidation: isNaN(parseInt(intimidation))
						? 0
						: parseInt(intimidation)
				}
			})
	}, [intimidation])

	return (
		<div className='flex items-center w-full h-min'>
			<CheckBox changeInputValue={changeIntimidation} />
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
