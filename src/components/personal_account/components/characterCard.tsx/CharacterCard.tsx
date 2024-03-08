import { FC } from 'react'
import './CharacterCard.css'
import { getCurrentCharacter } from '../../../../store/api/characterApiSlice'
import { useActions } from '../../../hooks/useActions'
import defaultCharacterImage from '../../../../assets/images/DefaultCharacter.png'
import { useLogout } from '../../../hooks/useLogout'

interface IProps {
	image: string | null
	grade: string
	race: string
	name: string
	character_id: string
}

export const CharacterCard: FC<IProps> = ({
	image,
	grade,
	race,
	name,
	character_id
}) => {
	const logout = useLogout()
	const { CharacterSaveApiResponse } = useActions()

	const makeRequest = async () => {
		const response = await getCurrentCharacter(character_id)
		if (response) CharacterSaveApiResponse(response)
		else logout()
	}

	return (
		<button className='outline-none bg-none border-none' onClick={makeRequest}>
			<div className='CardBlock min-h-[350px] max-h-[350px] w-auto'>
				<img
					src={!image ? defaultCharacterImage : image}
					className='w-fit'
					alt='Фото персонажа'
				/>
				<div className='curtain'></div>
				<div className='absolute inset-0 flex flex-col gap-y-4 justify-center items-center overflow-hidden'>
					<span>Класс: {grade}</span>
					<span>Раса: {race}</span>
					<span>Имя: {name}</span>
				</div>
			</div>
		</button>
	)
}
