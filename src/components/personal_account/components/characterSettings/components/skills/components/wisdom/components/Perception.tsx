import { FC, useEffect, useState } from 'react'
import { CheckBox } from '../../../ability/CheckBox'
import { Input } from '../../../ability/Input'
import { useTypedSelector } from '../../../../../../../../hooks/useTypedSelection'
import { IUpdatingFields } from '../../../../../../../../../types'
import { useActions } from '../../../../../../../../hooks/useActions'

interface IProps {
	makeUpdateRequest: (updatingField: IUpdatingFields) => Promise<void>
}

export const Perception: FC<IProps> = ({ makeUpdateRequest }) => {
	const { currentCharacterInfo } = useTypedSelector(state => state.Character)
	const { CharacterSaveApiResponse } = useActions()
	const [perception, changePerception] = useState(
		currentCharacterInfo.modifiers.perception.toString()
	)

	useEffect(() => {
		if (perception !== currentCharacterInfo.modifiers.perception.toString())
			CharacterSaveApiResponse({
				...currentCharacterInfo,
				modifiers: {
					...currentCharacterInfo.modifiers,
					perception: isNaN(parseInt(perception)) ? 0 : parseInt(perception)
				}
			})
	}, [perception])

	return (
		<div className='flex items-center w-full h-min'>
			<CheckBox changeInputValue={changePerception} />
			<Input
				inputValue={perception}
				changeInputValue={changePerception}
				updatingField={'perception'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<span className='font-bold text-left'>
				Воспри-
				<br />
				ятие
			</span>
		</div>
	)
}
