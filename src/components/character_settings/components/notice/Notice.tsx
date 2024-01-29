import { ContentBackgroundSVG } from '../../../../assets/svg'
import { Character } from '../../../Character'
import PaperBackground from '../../../../assets/images/PaperBackground.png'

export const Notice = () => {
	return (
		<div className='w-fit flex flex-col'>
			<div className='flex gap-x-12'>
				<div className='flex flex-col gap-y-8'>
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
					<Character imageDimension='220' nameBlockWidth='400' gap='28' />
					<div className='flex gap-x-12 mt-12'>
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
			<div className='w-full h-full relative'>
				<img
					src={PaperBackground}
					className='absolute w-full h-full pointer-events-none'
					alt='Фон в виде бумаги'
				/>
				<div className='w-full h-full flex flex-col items-center px-32 py-40'>
					<span className='text-5xl font-bold text-white'>Заметки</span>
					<textarea
						className='w-full h-full mt-4 outline-none bg-inherit text-white'
						placeholder='Введите текст'
					></textarea>
				</div>
			</div>
		</div>
	)
}
