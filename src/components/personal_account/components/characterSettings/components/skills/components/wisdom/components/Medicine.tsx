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

export const Medicine: FC<IProps> = ({ makeUpdateRequest }) => {
	const { currentCharacterInfo, isInitializedData } = useTypedSelector(
		state => state.Character
	)
	const { CharacterSaveApiResponse } = useActions()
	const [medicine, changeMedicine] = useState('0')

	useEffect(() => {
		if (isInitializedData)
			changeMedicine(currentCharacterInfo.modifiers.medicine.toString())
	}, [isInitializedData])

	useEffect(() => {
		if (isNaN(parseInt(medicine)) || !isInitializedData) return

		CharacterSaveApiResponse({
			...currentCharacterInfo,
			modifiers: {
				...currentCharacterInfo.modifiers,
				medicine: parseInt(medicine)
			}
		})
	}, [medicine])

	return (
		<div className='flex w-full h-min'>
			<CheckBox
				inputValue={medicine}
				changeInputValue={changeMedicine}
				updatingField={'medicine'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<Input
				inputValue={medicine}
				changeInputValue={changeMedicine}
				updatingField={'medicine'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<span className='font-bold'>Медицина</span>
		</div>
	)
}
