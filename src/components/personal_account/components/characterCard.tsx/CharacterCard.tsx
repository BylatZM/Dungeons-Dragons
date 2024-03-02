import { FC, useEffect, useState } from 'react'
import './CharacterCard.css'
import { ICharacterInfo } from '../../../../types'
import { useGetCurrentCharacterQuery } from '../../../../store/api/characterApiSlice'
import { useActions } from '../../../hooks/useActions'
import defaultCharacterImage from '../../../../assets/images/DefaultCharacter.png'

interface IProps {
	image: string | null
	grade: string
	race: string
	name: string
	character_id: string
	characterInfo: ICharacterInfo | null
	changeCharacterInfo: React.Dispatch<
		React.SetStateAction<ICharacterInfo | null>
	>
}

export const CharacterCard: FC<IProps> = ({
	image,
	grade,
	race,
	name,
	changeCharacterInfo,
	characterInfo,
	character_id
}) => {
	const { CharacterSaveApiResponse } = useActions()
	const [NeedSkipRequest, setNeedSkipRequest] = useState(true)
	const { data: getCharacterInfo } = useGetCurrentCharacterQuery(character_id, {
		skip: NeedSkipRequest
	})

	const makeRequest = async () => {
		setNeedSkipRequest(false)
	}

	useEffect(() => {
		if (!characterInfo && getCharacterInfo && !NeedSkipRequest) {
			setNeedSkipRequest(true)
			changeCharacterInfo(getCharacterInfo)
			CharacterSaveApiResponse(getCharacterInfo)
		}
	}, [getCharacterInfo, characterInfo, NeedSkipRequest])

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
