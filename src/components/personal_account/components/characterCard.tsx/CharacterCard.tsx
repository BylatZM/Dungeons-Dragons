import { FC } from 'react'
import './CharacterCard.css'
import { Link } from 'react-router-dom'

interface IProps {
	image: string
	grade: string
	species: string
	name: string
}

export const CharacterCard: FC<IProps> = ({ image, grade, species, name }) => {
	return (
		<Link to={'/character_settings'}>
			<div className='CardBlock h-fit w-fit'>
				<img src={image} className='w-fit' alt='Фото персонажа' />
				<div className='curtain'></div>
				<div className='absolute inset-0 flex flex-col gap-y-4 justify-center items-center overflow-hidden'>
					<span>Класс: {grade}</span>
					<span>Раса: {species}</span>
					<span>Имя: {name}</span>
				</div>
			</div>
		</Link>
	)
}
