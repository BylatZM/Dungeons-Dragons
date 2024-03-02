import { FC, useEffect, useState } from 'react'
import { CheckBox } from '../../../ability/CheckBox'
import { Input } from '../../../ability/Input'
import { IUpdatingFields } from '../../../../../../../../../types'
import { useTypedSelector } from '../../../../../../../../hooks/useTypedSelection'
import { useActions } from '../../../../../../../../hooks/useActions'

interface IProps {
	makeUpdateRequest: (updatingField: IUpdatingFields) => Promise<void>
}

export const Magic: FC<IProps> = ({ makeUpdateRequest }) => {
	const { currentCharacterInfo } = useTypedSelector(state => state.Character)
	const { CharacterSaveApiResponse } = useActions()
	const [magic, changeMagic] = useState(
		currentCharacterInfo.modifiers.magic.toString()
	)

	useEffect(() => {
		if (magic !== currentCharacterInfo.modifiers.magic.toString())
			CharacterSaveApiResponse({
				...currentCharacterInfo,
				modifiers: {
					...currentCharacterInfo.modifiers,
					magic: isNaN(parseInt(magic)) ? 0 : parseInt(magic)
				}
			})
	}, [magic])

	return (
		<div className='flex w-full h-min'>
			<CheckBox changeInputValue={changeMagic} />
			<Input
				inputValue={magic}
				changeInputValue={changeMagic}
				updatingField={'magic'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<span className='font-bold'>Магия</span>
		</div>
	)
}
