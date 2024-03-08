import { ArrowSVG, ContentBackgroundSVG } from '../../../../../../assets/svg'
import { CharacterImage } from './CharacterImage'
import PaperBackground from '../../../../../../assets/images/PaperBackground.png'
import { useState } from 'react'
import { useTypedSelector } from '../../../../../hooks/useTypedSelection'
import { useActions } from '../../../../../hooks/useActions'
import clsx from 'clsx'
import SelectBackground from '../../../../../../assets/images/SkillBackground.png'
import {
	ICharacterGrade,
	ICharacterUpdate,
	IUpdatingFields
} from '../../../../../../types'
import { useUpdateCharacterMutation } from '../../../../../../store/api/characterApiSlice'

export const Notice = () => {
	const { characterClasses, currentCharacterInfo } = useTypedSelector(
		state => state.Character
	)
	const { CharacterSaveApiResponse } = useActions()
	const [selectorActive, changeSelectorActive] = useState(false)
	const [updateCharacter] = useUpdateCharacterMutation()

	const makeUpdateRequest = async (
		updatingField: IUpdatingFields,
		new_value: string | number | ICharacterGrade
	) => {
		let updateData: ICharacterUpdate = {
			characterId: currentCharacterInfo.id,
			newValues: {}
		}
		if (updatingField === 'characterClass' && typeof new_value !== 'number') {
			const grade = characterClasses.filter(el => el === new_value)[0]
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					characterClass: grade
				}
			}
		}
		if (updatingField === 'experience' && typeof new_value === 'number')
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					experience: new_value
				}
			}
		if (updatingField === 'health' && typeof new_value === 'number')
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					health: new_value
				}
			}
		if (updatingField === 'lvl' && typeof new_value === 'number')
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					lvl: new_value
				}
			}
		if (updatingField === 'name' && typeof new_value === 'string')
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					name: new_value
				}
			}
		if (updatingField === 'notes' && typeof new_value === 'string')
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					notes: new_value
				}
			}
		if (updatingField === 'race' && typeof new_value === 'string')
			updateData = {
				...updateData,
				newValues: {
					...updateData.newValues,
					race: new_value
				}
			}
		if (Object.keys(updateData.newValues).length !== 0) {
			await updateCharacter(updateData).unwrap()
		}
	}

	return (
		<div className='ml-10 w-full h-fit flex'>
			<div className='flex gap-x-2'>
				<div className='flex flex-col'>
					<ContentBackgroundSVG dimension='175' marginTop='26.3'>
						<div className='w-full h-1/2 relative inset-y-10 text-center'>
							<span className='text-xl font-bold block'>Класс</span>
							<button
								className='relative w-5/6 mt-4 p-2 mx-auto outline-none border-none rounded-md text-white bg-inherit'
								onClick={() => changeSelectorActive(prev => !prev)}
							>
								<img
									src={SelectBackground}
									alt='Задний фон'
									className='pointer-events-none absolute w-[150px] h-[40px] inset-0'
								/>
								{currentCharacterInfo.characterClass}
								<div
									className={clsx(
										'transitionFast absolute w-fit h-fit right-1 inset-y-0 my-auto',
										selectorActive ? 'rotate-180' : 'rotate-90'
									)}
								>
									<ArrowSVG color='#fff' />
								</div>
							</button>
							<div
								className={clsx(
									'transitionFast absolute border-2 bg-main mt-6 w-[180px] flex flex-col gap-y-2 z-10',
									selectorActive
										? 'h-[250px] p-2 overflow-y-auto border-white'
										: 'h-0 overflow-hidden border-none'
								)}
							>
								{characterClasses.map((el, key) => (
									<button
										key={key}
										className={clsx(
											'outline-none border-2 p-2 text-center font-bold',
											currentCharacterInfo.characterClass === el
												? 'border-none bg-white color-main'
												: 'bg-inherit border-white text-white'
										)}
										onClick={() => {
											if (currentCharacterInfo.characterClass !== el) {
												changeSelectorActive(prev => !prev)
												CharacterSaveApiResponse({
													...currentCharacterInfo,
													characterClass: el
												})
												makeUpdateRequest('characterClass', el)
											}
										}}
									>
										{el}
									</button>
								))}
							</div>
						</div>
					</ContentBackgroundSVG>
					<ContentBackgroundSVG dimension='175' marginTop='26.3'>
						<div className='w-full h-1/2 relative inset-y-10 text-center'>
							<span className='text-xl font-bold block'>Раса</span>
							<input
								placeholder='Раса'
								className='mt-4 w-5/6 bg-inherit outline-none border-none'
								value={currentCharacterInfo.race}
								onChange={e => {
									if (/^[А-Яа-я]*$/.test(e.target.value)) {
										CharacterSaveApiResponse({
											...currentCharacterInfo,
											race: e.target.value
										})
									}
								}}
								onBlur={e => makeUpdateRequest('race', e.target.value)}
							/>
						</div>
					</ContentBackgroundSVG>
					<ContentBackgroundSVG dimension='175' marginTop='26.3'>
						<div className='w-full h-1/2 relative inset-y-10 text-center'>
							<span className='text-xl font-bold block'>Уровень</span>
							<input
								value={currentCharacterInfo.lvl}
								onChange={e => {
									if (/^[0-9]*$/.test(e.target.value)) {
										CharacterSaveApiResponse({
											...currentCharacterInfo,
											lvl: isNaN(parseInt(e.target.value))
												? 0
												: parseInt(e.target.value)
										})
									}
								}}
								placeholder='Уровень'
								className='mt-4 w-[45px] bg-inherit outline-none border-none'
								onBlur={e => makeUpdateRequest('lvl', parseInt(e.target.value))}
							/>
						</div>
					</ContentBackgroundSVG>
				</div>
				<div className='mt-[26.3px]'>
					<CharacterImage
						imageDimension='220'
						nameBlockWidth='350'
						gap='28'
						makeUpdateRequest={makeUpdateRequest}
					/>
					<div className='flex gap-x-2 mt-[46px]'>
						<ContentBackgroundSVG dimension='175'>
							<div className='w-full h-1/2 relative inset-y-10 flex flex-col items-center'>
								<span className='text-xl font-bold block'>Очки опыта</span>
								<div className='flex gap-x-1 mt-4'>
									<input
										placeholder='Очки опыта'
										className='w-[50px] bg-inherit outline-none border-none'
										value={currentCharacterInfo.experience}
										onChange={e => {
											if (/^[0-9]*$/.test(e.target.value)) {
												CharacterSaveApiResponse({
													...currentCharacterInfo,
													experience: isNaN(parseInt(e.target.value))
														? 0
														: parseInt(e.target.value)
												})
											}
										}}
										onBlur={e =>
											makeUpdateRequest('experience', parseInt(e.target.value))
										}
									/>
									<span className='text-white'>XP</span>
								</div>
							</div>
						</ContentBackgroundSVG>
						<ContentBackgroundSVG dimension='175'>
							<div className='w-full h-1/2 relative inset-y-10 flex flex-col items-center'>
								<span className='text-xl font-bold block'>Здоровье</span>
								<div className='flex gap-x-1 mt-4'>
									<input
										placeholder='Здоровье'
										className='w-[50px] bg-inherit outline-none border-none'
										value={currentCharacterInfo.health}
										onChange={e => {
											if (/^[0-9]*$/.test(e.target.value)) {
												CharacterSaveApiResponse({
													...currentCharacterInfo,
													health: isNaN(parseInt(e.target.value))
														? 0
														: parseInt(e.target.value)
												})
											}
										}}
										onBlur={e =>
											makeUpdateRequest('health', parseInt(e.target.value))
										}
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
						value={currentCharacterInfo.notes}
						onChange={e => {
							CharacterSaveApiResponse({
								...currentCharacterInfo,
								notes: e.target.value
							})
						}}
						onBlur={e => makeUpdateRequest('notes', e.target.value)}
					></textarea>
				</div>
			</div>
		</div>
	)
}
