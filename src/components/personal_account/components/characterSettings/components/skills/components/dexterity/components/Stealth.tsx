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

export const Stealth: FC<IProps> = ({ makeUpdateRequest }) => {
	const { currentCharacterInfo, isInitializedData } = useTypedSelector(
		state => state.Character
	)
	const { CharacterSaveApiResponse } = useActions()
	const [stealth, changeStealth] = useState('0')

	useEffect(() => {
		if (isInitializedData)
			changeStealth(currentCharacterInfo.modifiers.stealth.toString())
	}, [isInitializedData])

	useEffect(() => {
		if (isNaN(parseInt(stealth)) || !isInitializedData) return

		CharacterSaveApiResponse({
			...currentCharacterInfo,
			modifiers: {
				...currentCharacterInfo.modifiers,
				stealth: parseInt(stealth)
			}
		})
	}, [stealth])

	return (
		<div className='flex items-center w-full h-min'>
			<CheckBox
				inputValue={stealth}
				changeInputValue={changeStealth}
				updatingField={'stealth'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<Input
				inputValue={stealth}
				changeInputValue={changeStealth}
				updatingField={'stealth'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<span className='font-bold'>Скрытность рук</span>
		</div>
	)
}
