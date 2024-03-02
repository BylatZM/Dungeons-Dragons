import { FC, useEffect, useState } from 'react'
import { Input } from '../../../ability/Input'
import { CheckBox } from '../../../ability/CheckBox'
import { IUpdatingFields } from '../../../../../../../../../types'
import { useTypedSelector } from '../../../../../../../../hooks/useTypedSelection'
import { useActions } from '../../../../../../../../hooks/useActions'

interface IProps {
	makeUpdateRequest: (updatingField: IUpdatingFields) => Promise<void>
}

export const Conviction: FC<IProps> = ({ makeUpdateRequest }) => {
	const { currentCharacterInfo } = useTypedSelector(state => state.Character)
	const { CharacterSaveApiResponse } = useActions()
	const [conviction, changeConviction] = useState(
		currentCharacterInfo.modifiers.conviction.toString()
	)

	useEffect(() => {
		if (conviction !== currentCharacterInfo.modifiers.conviction.toString())
			CharacterSaveApiResponse({
				...currentCharacterInfo,
				modifiers: {
					...currentCharacterInfo.modifiers,
					conviction: isNaN(parseInt(conviction)) ? 0 : parseInt(conviction)
				}
			})
	}, [conviction])

	return (
		<div className='flex w-full h-min'>
			<CheckBox changeInputValue={changeConviction} />
			<Input
				inputValue={conviction}
				changeInputValue={changeConviction}
				updatingField={'conviction'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<span className='font-bold'>Убеждение</span>
		</div>
	)
}
