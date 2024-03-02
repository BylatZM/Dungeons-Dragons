import { FC, useEffect, useState } from 'react'
import { CheckBox } from '../../../ability/CheckBox'
import { Input } from '../../../ability/Input'
import { useActions } from '../../../../../../../../hooks/useActions'
import { useTypedSelector } from '../../../../../../../../hooks/useTypedSelection'
import { IUpdatingFields } from '../../../../../../../../../types'

interface IProps {
	makeUpdateRequest: (updatingField: IUpdatingFields) => Promise<void>
}

export const Survival: FC<IProps> = ({ makeUpdateRequest }) => {
	const { currentCharacterInfo } = useTypedSelector(state => state.Character)
	const { CharacterSaveApiResponse } = useActions()
	const [survival, changeSurvival] = useState(
		currentCharacterInfo.modifiers.survival.toString()
	)

	useEffect(() => {
		if (survival !== currentCharacterInfo.modifiers.survival.toString())
			CharacterSaveApiResponse({
				...currentCharacterInfo,
				modifiers: {
					...currentCharacterInfo.modifiers,
					survival: isNaN(parseInt(survival)) ? 0 : parseInt(survival)
				}
			})
	}, [survival])

	return (
		<div className='flex items-center w-full h-min'>
			<CheckBox changeInputValue={changeSurvival} />
			<Input
				inputValue={survival}
				changeInputValue={changeSurvival}
				updatingField={'survival'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<span className='font-bold text-left'>
				Выжива-
				<br />
				ние
			</span>
		</div>
	)
}
