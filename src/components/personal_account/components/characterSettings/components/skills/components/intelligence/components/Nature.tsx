import { FC, useEffect, useState } from 'react'
import { Input } from '../../../ability/Input'
import { CheckBox } from '../../../ability/CheckBox'
import { IUpdatingFields } from '../../../../../../../../../types'
import { useTypedSelector } from '../../../../../../../../hooks/useTypedSelection'
import { useActions } from '../../../../../../../../hooks/useActions'

interface IProps {
	makeUpdateRequest: (updatingField: IUpdatingFields) => Promise<void>
}

export const Nature: FC<IProps> = ({ makeUpdateRequest }) => {
	const { currentCharacterInfo } = useTypedSelector(state => state.Character)
	const { CharacterSaveApiResponse } = useActions()
	const [nature, changeNature] = useState(
		currentCharacterInfo.modifiers.nature.toString()
	)

	useEffect(() => {
		if (nature !== currentCharacterInfo.modifiers.nature.toString())
			CharacterSaveApiResponse({
				...currentCharacterInfo,
				modifiers: {
					...currentCharacterInfo.modifiers,
					nature: isNaN(parseInt(nature)) ? 0 : parseInt(nature)
				}
			})
	}, [nature])

	return (
		<div className='flex w-full h-min'>
			<CheckBox changeInputValue={changeNature} />
			<Input
				inputValue={nature}
				changeInputValue={changeNature}
				updatingField={'nature'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<span className='font-bold'>Природа</span>
		</div>
	)
}
