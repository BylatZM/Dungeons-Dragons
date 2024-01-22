import { FC } from 'react'
import { CharacterCardSVG } from '../../../../assets/svg/CharacterCardSVG'
import { ButtonSkeleton } from '../ButtonSkeleton'

interface IProps {
	image: string
	grade: string
	species: string
	name: string
}

export const CharacterCard: FC<IProps> = ({ image, grade, species, name }) => {
	return (
		<div className='relative w-[400px] h-[280px]'>
			<CharacterCardSVG />
			<div className='absolute inset-0 p-10 text-center'>
				<div className='flex gap-x-4 justify-between '>
					<img
						src={image}
						className='w-[135px] h-[135px] border-white border-2 rounded-full'
						alt=''
					/>
					<div className='text-white flex flex-col justify-center gap-y-2 text-lg items-start'>
						<span>Класс: {grade}</span>
						<span>Расса: {species}</span>
						<span>Имя: {name}</span>
					</div>
				</div>
				<button className='relative mt-4 bg-none border-none outline-none w-[180px] h-[40px] button'>
					<div className='absolute inset-0 w-full h-full'>
						<ButtonSkeleton text='Править' color='#3b82f6' />
					</div>
					<div className='transitionGeneral absolute  inset-0 w-full h-full passive'>
						<ButtonSkeleton text='Править' color='#fff' />
					</div>
				</button>
			</div>
		</div>
	)
}
