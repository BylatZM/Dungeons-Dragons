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

export const Nature: FC<IProps> = ({ makeUpdateRequest }) => {
	const { currentCharacterInfo, isInitializedData } = useTypedSelector(
		state => state.Character
	)
	const { CharacterSaveApiResponse } = useActions()
	const [nature, changeNature] = useState('0')

	useEffect(() => {
		if (isInitializedData)
			changeNature(currentCharacterInfo.modifiers.nature.toString())
	}, [isInitializedData])

	useEffect(() => {
		if (isNaN(parseInt(nature)) || !isInitializedData) return

		CharacterSaveApiResponse({
			...currentCharacterInfo,
			modifiers: {
				...currentCharacterInfo.modifiers,
				nature: parseInt(nature)
			}
		})
	}, [nature])

	return (
		<div className='flex w-full h-min'>
			<CheckBox
				inputValue={nature}
				changeInputValue={changeNature}
				updatingField={'nature'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<Input
				inputValue={nature}
				changeInputValue={changeNature}
				updatingField={'nature'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<span className='font-bold'>Природа</span>
		</div>
	)
}
