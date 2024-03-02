import { FC, useEffect, useState } from 'react'
import { Input } from '../../../ability/Input'
import { CheckBox } from '../../../ability/CheckBox'
import { useTypedSelector } from '../../../../../../../../hooks/useTypedSelection'
import { useActions } from '../../../../../../../../hooks/useActions'
import { IUpdatingFields } from '../../../../../../../../../types'

interface IProps {
	makeUpdateRequest: (updatingField: IUpdatingFields) => Promise<void>
}

export const Religion: FC<IProps> = ({ makeUpdateRequest }) => {
	const { currentCharacterInfo } = useTypedSelector(state => state.Character)
	const { CharacterSaveApiResponse } = useActions()
	const [religion, changeReligion] = useState(
		currentCharacterInfo.modifiers.religion.toString()
	)

	useEffect(() => {
		if (religion !== currentCharacterInfo.modifiers.religion.toString())
			CharacterSaveApiResponse({
				...currentCharacterInfo,
				modifiers: {
					...currentCharacterInfo.modifiers,
					religion: isNaN(parseInt(religion)) ? 0 : parseInt(religion)
				}
			})
	}, [religion])

	return (
		<div className='flex w-full h-min'>
			<CheckBox changeInputValue={changeReligion} />
			<Input
				inputValue={religion}
				changeInputValue={changeReligion}
				updatingField={'religion'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<span className='font-bold'>Религия</span>
		</div>
	)
}
