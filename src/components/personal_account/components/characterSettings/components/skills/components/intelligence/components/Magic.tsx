import { FC, useEffect, useState } from 'react'
import { CheckBox } from '../../../ability/CheckBox'
import { Input } from '../../../ability/Input'
import { IUpdatingFields } from '../../../../../../../../../types'
import { useTypedSelector } from '../../../../../../../../hooks/useTypedSelection'
import { useActions } from '../../../../../../../../hooks/useActions'

interface IProps {
	makeUpdateRequest: (
		updatingField: IUpdatingFields,
		new_value: number
	) => Promise<void>
}

export const Magic: FC<IProps> = ({ makeUpdateRequest }) => {
	const { currentCharacterInfo, isInitializedData } = useTypedSelector(
		state => state.Character
	)
	const { CharacterSaveApiResponse } = useActions()
	const [magic, changeMagic] = useState('0')

	useEffect(() => {
		if (isInitializedData)
			changeMagic(currentCharacterInfo.modifiers.magic.toString())
	}, [isInitializedData])

	useEffect(() => {
		if (isNaN(parseInt(magic)) || !isInitializedData) return

		CharacterSaveApiResponse({
			...currentCharacterInfo,
			modifiers: {
				...currentCharacterInfo.modifiers,
				magic: parseInt(magic)
			}
		})
	}, [magic])

	return (
		<div className='flex w-full h-min'>
			<CheckBox
				inputValue={magic}
				changeInputValue={changeMagic}
				updatingField={'magic'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<Input
				inputValue={magic}
				changeInputValue={changeMagic}
				updatingField={'magic'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<span className='font-bold'>Магия</span>
		</div>
	)
}
