import { ContentBackgroundSVG } from '../../../../../assets/svg'

export const CharacterRace = () => {
	return (
		<ContentBackgroundSVG dimension='180'>
			<div className='w-full h-1/2 relative inset-y-10 text-center'>
				<span className='text-lg font-bold block'>Расса</span>
				<input
					placeholder='Расса'
					className='border-2 p-2 w-5/6 mt-4 mx-auto outline-none border-white rounded-md text-white bg-inherit'
				/>
			</div>
		</ContentBackgroundSVG>
	)
}
