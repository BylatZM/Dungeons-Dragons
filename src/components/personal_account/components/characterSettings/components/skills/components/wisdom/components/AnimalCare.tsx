import { FC, useEffect, useState } from 'react'
import { CheckBox } from '../../../ability/CheckBox'
import { Input } from '../../../ability/Input'
import { useTypedSelector } from '../../../../../../../../hooks/useTypedSelection'
import { useActions } from '../../../../../../../../hooks/useActions'
import { IUpdatingFields } from '../../../../../../../../../types'

interface IProps {
	makeUpdateRequest: (updatingField: IUpdatingFields) => Promise<void>
}

export const AnimalCare: FC<IProps> = ({ makeUpdateRequest }) => {
	const { currentCharacterInfo } = useTypedSelector(state => state.Character)
	const { CharacterSaveApiResponse } = useActions()
	const [animalCare, changeAnimalCare] = useState(
		currentCharacterInfo.modifiers.animalCare.toString()
	)

	useEffect(() => {
		if (animalCare !== currentCharacterInfo.modifiers.animalCare.toString())
			CharacterSaveApiResponse({
				...currentCharacterInfo,
				modifiers: {
					...currentCharacterInfo.modifiers,
					animalCare: isNaN(parseInt(animalCare)) ? 0 : parseInt(animalCare)
				}
			})
	}, [animalCare])

	return (
		<div className='flex items-center w-full h-min'>
			<CheckBox changeInputValue={changeAnimalCare} />
			<Input
				inputValue={animalCare}
				changeInputValue={changeAnimalCare}
				updatingField={'animalCare'}
				makeUpdateRequest={makeUpdateRequest}
			/>
			<span className='font-bold text-left'>
				Уход за живот-
				<br />
				ными
			</span>
		</div>
	)
}
