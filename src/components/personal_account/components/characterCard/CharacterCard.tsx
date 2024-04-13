import { FC, useState } from 'react'
import './CharacterCard.css'
import { getCurrentCharacter } from '../../../../store/api/characterApiSlice'
import { useActions } from '../../../hooks/useActions'
import defaultCharacterImage from '../../../../assets/images/DefaultCharacter.png'
import { SpinnerSVG } from '../../../../assets/svg'
import clsx from 'clsx'

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
	const [imageLoaded, setImageLoaded] = useState(false)
	const { CharacterSaveApiResponse, AuthSessionStatus } = useActions()

	const handleImageLoad = () => {
		setImageLoaded(true)
	}

	const makeRequest = async () => {
		const response = await getCurrentCharacter(character_id)
		if (response) CharacterSaveApiResponse(response)
		else AuthSessionStatus('expired')
	}

	return (
		<>
			<button
				className={clsx(
					'outline-none bg-none border-none',
					imageLoaded ? 'block' : 'hidden'
				)}
				onClick={makeRequest}
			>
				<div className='CardBlock min-h-[350px] max-h-[350px] w-auto'>
					<img
						src={!image ? defaultCharacterImage : image}
						className='w-fit'
						alt='Фото персонажа'
						onLoad={handleImageLoad}
					/>
					<div className='curtain'></div>
					<div className='absolute inset-0 flex flex-col gap-y-4 justify-center items-center overflow-hidden'>
						<span>Класс: {grade}</span>
						<span>Раса: {race}</span>
						<span>Имя: {name}</span>
					</div>
				</div>
			</button>
			{!imageLoaded && (
				<div className='loadingBlock min-h-[350px] max-h-[350px] w-[280px] text-white'>
					<SpinnerSVG color={'#fff'} />
					<span className='ml-2'>Загрузка</span>
				</div>
			)}
		</>
	)
}
