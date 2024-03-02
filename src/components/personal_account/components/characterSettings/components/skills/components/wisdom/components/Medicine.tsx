import { FC, useEffect, useState } from 'react'
import { CheckBox } from '../../../ability/CheckBox'
import { Input } from '../../../ability/Input'
import { IUpdatingFields } from '../../../../../../../../../types'
import { useTypedSelector } from '../../../../../../../../hooks/useTypedSelection'
import { useActions } from '../../../../../../../../hooks/useActions'

interface IProps {
	makeUpdateRequest: (updatingField: IUpdatingFields) => Promise<void>
}

export const Medicine: FC<IProps> = ({ makeUpdateRequest }) => {
	const { currentCharacterInfo } = useTypedSelector(state => state.Character)
	const { CharacterSaveApiResponse } = useActions()
	const [medicine, changeMedicine] = useState(
		currentCharacterInfo.modifiers.medicine.toString()
	)

	useEffect(() => {
		if (medicine !== currentCharacterInfo.modifiers.medicine.toString())
			CharacterSaveApiResponse({
				...currentCharacterInfo,
				modifiers: {
					...currentCharacterInfo.modifiers,
					medicine: isNaN(parseInt(medicine)) ? 0 : parseInt(medicine)
				}
			})
	}, [medicine])

	return (
		<div className='flex w-full h-min'>
			<CheckBox changeInputValue={changeMedicine} />
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
