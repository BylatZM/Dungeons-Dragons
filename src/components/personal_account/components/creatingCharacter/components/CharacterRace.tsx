import { FC } from 'react'
import { ContentBackgroundSVG } from '../../../../../assets/svg'
import { ICharacterCreateForm } from '../../../../../types'

interface IProps {
	changeFormData: React.Dispatch<React.SetStateAction<ICharacterCreateForm>>
	formData: ICharacterCreateForm
}

export const CharacterRace: FC<IProps> = ({ changeFormData, formData }) => {
	return (
		<ContentBackgroundSVG dimension='180'>
			<div className='w-full h-1/2 relative inset-y-10 text-center'>
				<span className='text-lg font-bold block'>Раса</span>
				<input
					placeholder='Раса'
					className='w-5/6 mt-4 mx-auto outline-none border-none text-white bg-inherit'
					value={formData.race}
					onChange={e =>
						changeFormData(prev => ({ ...prev, race: e.target.value }))
					}
				/>
			</div>
		</ContentBackgroundSVG>
	)
}
