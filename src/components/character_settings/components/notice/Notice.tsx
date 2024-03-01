import { ContentBackgroundSVG } from '../../../../assets/svg'
import { Character } from '../../../Character'
import PaperBackground from '../../../../assets/images/PaperBackground.png'

export const Notice = () => {
	return (
		<div className='ml-10 w-full h-fit flex'>
			<div className='flex gap-x-2'>
				<div className='flex flex-col'>
					<ContentBackgroundSVG dimension='175' marginTop='26.3'>
						<div className='w-full h-1/2 relative inset-y-10 text-center'>
							<span className='text-xl font-bold block'>Уровень</span>
							<input
								placeholder='Класс'
								className='mt-4 w-[45px] bg-inherit outline-none border-none'
							/>
						</div>
					</ContentBackgroundSVG>
					<ContentBackgroundSVG dimension='175' marginTop='26.3'>
						<div className='w-full h-1/2 relative inset-y-10 flex flex-col items-center'>
							<span className='text-xl font-bold block'>Очки опыта</span>
							<div className='flex gap-x-2 mt-4'>
								<input
									placeholder='Очки опыта'
									className='w-[90px] bg-inherit outline-none border-none'
								/>
								<span className='text-white'>XP</span>
							</div>
						</div>
					</ContentBackgroundSVG>
					<ContentBackgroundSVG dimension='175' marginTop='26.3'>
						<div className='w-full h-1/2 relative inset-y-10 text-center'>
							<span className='text-xl font-bold block'>Раса</span>
							<input
								placeholder='Раса'
								className='mt-4 w-[45px] bg-inherit outline-none border-none'
							/>
						</div>
					</ContentBackgroundSVG>
				</div>
				<div className='mt-[26.3px]'>
					{/* <Character imageDimension='220' nameBlockWidth='350' gap='28' /> */}
					<div className='flex gap-x-2 mt-[46px]'>
						<ContentBackgroundSVG dimension='175'>
							<div className='w-full h-1/2 relative inset-y-10 text-center'>
								<span className='text-xl font-bold block'>Класс</span>
								<input
									placeholder='Класс'
									className='mt-4 w-[45px] bg-inherit outline-none border-none'
								/>
							</div>
						</ContentBackgroundSVG>
						<ContentBackgroundSVG dimension='175'>
							<div className='w-full h-1/2 relative inset-y-10 flex flex-col items-center'>
								<span className='text-xl font-bold block'>Здоровье</span>
								<div className='flex gap-x-2 mt-4 '>
									<input
										placeholder='Здоровье'
										className='w-[70px] bg-inherit outline-none border-none'
									/>
									<span className='text-white'>HP</span>
								</div>
							</div>
						</ContentBackgroundSVG>
					</div>
				</div>
			</div>
			<div className='ml-10 relative min-w-[370px] max-w-[370px]'>
				<img
					src={PaperBackground}
					className='absolute w-full h-full pointer-events-none'
					alt='Фон в виде бумаги'
				/>
				<div className='w-full h-full flex flex-col items-center justify-center overflow-hidden'>
					<span className='text-3xl font-bold text-white'>Заметки</span>
					<textarea
						className='w-[250px] h-1/2 mt-4 outline-none bg-inherit text-white'
						placeholder='Введите текст'
						style={{ resize: 'none' }}
					></textarea>
				</div>
			</div>
		</div>
	)
}
