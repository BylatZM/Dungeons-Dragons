import { FC, useEffect, useState } from 'react'
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

export const Religion: FC<IProps> = ({ makeUpdateRequest }) => {
	const { currentCharacterInfo, isInitializedData } = useTypedSelector(
		state => state.Character
	)
	const { CharacterSaveApiResponse } = useActions()
	const [religion, changeReligion] = useState('0')

	useEffect(() => {
		if (isInitializedData)
			changeReligion(currentCharacterInfo.modifiers.religion.toString())
	}, [isInitializedData])

	useEffect(() => {
		if (isNaN(parseInt(religion)) || !isInitializedData) return

		CharacterSaveApiResponse({
			...currentCharacterInfo,
			modifiers: {
				...currentCharacterInfo.modifiers,
				religion: parseInt(religion)
			}
		})
	}, [religion])

	return (
		<div className='flex w-full h-min'>
			<CheckBox
				inputValue={religion}
				changeInputValue={changeReligion}
				updatingField={'religion'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<Input
				inputValue={religion}
				changeInputValue={changeReligion}
				updatingField={'religion'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<span className='font-bold'>Религия</span>
		</div>
	)
}
