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

export const Acrobatics: FC<IProps> = ({ makeUpdateRequest }) => {
	const { currentCharacterInfo, isInitializedData } = useTypedSelector(
		state => state.Character
	)
	const { CharacterSaveApiResponse } = useActions()
	const [acrobatics, changeAcrobatics] = useState('0')

	useEffect(() => {
		if (isInitializedData)
			changeAcrobatics(currentCharacterInfo.modifiers.perception.toString())
	}, [isInitializedData])

	useEffect(() => {
		if (isNaN(parseInt(acrobatics)) || !isInitializedData) return

		CharacterSaveApiResponse({
			...currentCharacterInfo,
			modifiers: {
				...currentCharacterInfo.modifiers,
				acrobatics: parseInt(acrobatics)
			}
		})
	}, [acrobatics])

	return (
		<div className='flex w-full h-min'>
			<CheckBox
				inputValue={acrobatics}
				changeInputValue={changeAcrobatics}
				updatingField={'acrobatics'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<Input
				inputValue={acrobatics}
				changeInputValue={changeAcrobatics}
				updatingField={'acrobatics'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<span className='font-bold'>Акробатика</span>
		</div>
	)
}
