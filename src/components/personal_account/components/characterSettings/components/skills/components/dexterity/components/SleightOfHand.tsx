import { FC, useEffect, useState } from 'react'
import { CheckBox } from '../../../ability/CheckBox'
import { Input } from '../../../ability/Input'
import { useTypedSelector } from '../../../../../../../../hooks/useTypedSelection'
import { useActions } from '../../../../../../../../hooks/useActions'
import { IUpdatingFields } from '../../../../../../../../../types'

interface IProps {
	makeUpdateRequest: (updatingField: IUpdatingFields) => Promise<void>
}

export const SleightOfHand: FC<IProps> = ({ makeUpdateRequest }) => {
	const { currentCharacterInfo } = useTypedSelector(state => state.Character)
	const { CharacterSaveApiResponse } = useActions()
	const [sleightOfHand, changeSleightOfHand] = useState(
		currentCharacterInfo.modifiers.sleightOfHand.toString()
	)

	useEffect(() => {
		if (
			sleightOfHand !== currentCharacterInfo.modifiers.sleightOfHand.toString()
		)
			CharacterSaveApiResponse({
				...currentCharacterInfo,
				modifiers: {
					...currentCharacterInfo.modifiers,
					sleightOfHand: isNaN(parseInt(sleightOfHand))
						? 0
						: parseInt(sleightOfHand)
				}
			})
	}, [sleightOfHand])

	return (
		<div className='flex items-center w-full h-min'>
			<CheckBox changeInputValue={changeSleightOfHand} />
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
