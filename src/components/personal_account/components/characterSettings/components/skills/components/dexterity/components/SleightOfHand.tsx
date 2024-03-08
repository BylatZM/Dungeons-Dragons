import { FC, useEffect, useState } from 'react'
import { CheckBox } from '../../../ability/CheckBox'
import { Input } from '../../../ability/Input'
import { useTypedSelector } from '../../../../../../../../hooks/useTypedSelection'
import { useActions } from '../../../../../../../../hooks/useActions'
import { IUpdatingFields } from '../../../../../../../../../types'

interface IProps {
	makeUpdateRequest: (
		updatingField: IUpdatingFields,
		new_value: number
	) => Promise<void>
}

export const SleightOfHand: FC<IProps> = ({ makeUpdateRequest }) => {
	const { currentCharacterInfo, isInitializedData } = useTypedSelector(
		state => state.Character
	)
	const { CharacterSaveApiResponse } = useActions()
	const [sleightOfHand, changeSleightOfHand] = useState('0')

	useEffect(() => {
		if (isInitializedData)
			changeSleightOfHand(
				currentCharacterInfo.modifiers.sleightOfHand.toString()
			)
	}, [isInitializedData])

	useEffect(() => {
		if (isNaN(parseInt(sleightOfHand)) || !isInitializedData) return

		CharacterSaveApiResponse({
			...currentCharacterInfo,
			modifiers: {
				...currentCharacterInfo.modifiers,
				sleightOfHand: parseInt(sleightOfHand)
			}
		})
	}, [sleightOfHand])

	return (
		<div className='flex items-center w-full h-min'>
			<CheckBox
				inputValue={sleightOfHand}
				changeInputValue={changeSleightOfHand}
				updatingField={'sleightOfHand'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<Input
				inputValue={sleightOfHand}
				changeInputValue={changeSleightOfHand}
				updatingField={'sleightOfHand'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<span className='font-bold'>Ловкость рук</span>
		</div>
	)
}
