import { FC, useEffect, useState } from 'react'
import { CheckBox } from '../../../ability/CheckBox'
import { Input } from '../../../ability/Input'
import { IUpdatingFields } from '../../../../../../../../../types'
import { useTypedSelector } from '../../../../../../../../hooks/useTypedSelection'
import { useActions } from '../../../../../../../../hooks/useActions'

interface IProps {
	makeUpdateRequest: (updatingField: IUpdatingFields) => Promise<void>
}

export const Stealth: FC<IProps> = ({ makeUpdateRequest }) => {
	const { currentCharacterInfo } = useTypedSelector(state => state.Character)
	const { CharacterSaveApiResponse } = useActions()
	const [stealth, changeStealth] = useState(
		currentCharacterInfo.modifiers.stealth.toString()
	)

	useEffect(() => {
		if (stealth !== currentCharacterInfo.modifiers.stealth.toString())
			CharacterSaveApiResponse({
				...currentCharacterInfo,
				modifiers: {
					...currentCharacterInfo.modifiers,
					stealth: isNaN(parseInt(stealth)) ? 0 : parseInt(stealth)
				}
			})
	}, [stealth])

	return (
		<div className='flex items-center w-full h-min'>
			<CheckBox changeInputValue={changeStealth} />
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
