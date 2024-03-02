import { FC, useEffect, useState } from 'react'
import { CheckBox } from '../../../ability/CheckBox'
import { Input } from '../../../ability/Input'
import { IUpdatingFields } from '../../../../../../../../../types'
import { useTypedSelector } from '../../../../../../../../hooks/useTypedSelection'
import { useActions } from '../../../../../../../../hooks/useActions'

interface IProps {
	makeUpdateRequest: (updatingField: IUpdatingFields) => Promise<void>
}

export const Acrobatics: FC<IProps> = ({ makeUpdateRequest }) => {
	const { currentCharacterInfo } = useTypedSelector(state => state.Character)
	const { CharacterSaveApiResponse } = useActions()
	const [acrobatics, changeAcrobatics] = useState(
		currentCharacterInfo.modifiers.acrobatics.toString()
	)

	useEffect(() => {
		if (acrobatics !== currentCharacterInfo.modifiers.acrobatics.toString())
			CharacterSaveApiResponse({
				...currentCharacterInfo,
				modifiers: {
					...currentCharacterInfo.modifiers,
					acrobatics: isNaN(parseInt(acrobatics)) ? 0 : parseInt(acrobatics)
				}
			})
	}, [acrobatics])

	return (
		<div className='flex w-full h-min'>
			<CheckBox changeInputValue={changeAcrobatics} />
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
