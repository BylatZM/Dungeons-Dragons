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

export const Conviction: FC<IProps> = ({ makeUpdateRequest }) => {
	const { currentCharacterInfo, isInitializedData } = useTypedSelector(
		state => state.Character
	)
	const { CharacterSaveApiResponse } = useActions()
	const [conviction, changeConviction] = useState('0')

	useEffect(() => {
		if (isInitializedData)
			changeConviction(currentCharacterInfo.modifiers.conviction.toString())
	}, [isInitializedData])

	useEffect(() => {
		if (isNaN(parseInt(conviction)) || !isInitializedData) return

		CharacterSaveApiResponse({
			...currentCharacterInfo,
			modifiers: {
				...currentCharacterInfo.modifiers,
				conviction: parseInt(conviction)
			}
		})
	}, [conviction])

	return (
		<div className='flex w-full h-min'>
			<CheckBox
				inputValue={conviction}
				changeInputValue={changeConviction}
				updatingField={'intimidation'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<Input
				inputValue={conviction}
				changeInputValue={changeConviction}
				updatingField={'conviction'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<span className='font-bold'>Убеждение</span>
		</div>
	)
}
