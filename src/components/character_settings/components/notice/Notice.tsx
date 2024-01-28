import { ContentBackgroundSVG } from '../../../../assets/svg'
import { Character } from '../../../Character'

export const Notice = () => {
	return (
		<div>
			<div className='flex gap-x-8'>
				<div className='flex flex-col gap-y-4'>
					<ContentBackgroundSVG dimension='175'>
						<div className='w-full h-1/2 relative inset-y-10 text-center'>
							<span className='text-lg font-bold block'>Уровень</span>
							<input
								placeholder='Класс'
								className='mt-4 w-[45px] bg-inherit outline-none border-none'
							/>
						</div>
					</ContentBackgroundSVG>
					<ContentBackgroundSVG dimension='175'>
						<div className='w-full h-1/2 relative inset-y-10 text-center'>
							<span className='text-lg font-bold block'>Очки опыта</span>
							<input
								placeholder='Очки опыта'
								className='mt-4 w-[90px] bg-inherit outline-none border-none'
							/>
						</div>
					</ContentBackgroundSVG>
					<ContentBackgroundSVG dimension='175'>
						<div className='w-full h-1/2 relative inset-y-10 text-center'>
							<span className='text-lg font-bold block'>Расса</span>
							<input
								placeholder='Расса'
								className='mt-4 w-[45px] bg-inherit outline-none border-none'
							/>
						</div>
					</ContentBackgroundSVG>
				</div>
				<div>
					<Character imageDimension='220' nameBlockWidth='380' gap='12' />
					<div className='flex gap-x-8 mt-8'>
						<ContentBackgroundSVG dimension='175'>
							<div className='w-full h-1/2 relative inset-y-10 text-center'>
								<span className='text-lg font-bold block'>Класс</span>
								<input
									placeholder='Класс'
									className='mt-4 w-[45px] bg-inherit outline-none border-none'
								/>
							</div>
						</ContentBackgroundSVG>
						<ContentBackgroundSVG dimension='175'>
							<div className='w-full h-1/2 relative inset-y-10 flex flex-col items-center'>
								<span className='text-lg font-bold block'>Здоровье</span>
								<div className='flex gap-x-2 mt-4 '>
									<input
										placeholder='Здоровье'
										className='w-[70px] bg-inherit outline-none border-none'
									/>
									<span className='text-white font-bold'>XP</span>
								</div>
							</div>
						</ContentBackgroundSVG>
					</div>
				</div>
			</div>
		</div>
	)
}
