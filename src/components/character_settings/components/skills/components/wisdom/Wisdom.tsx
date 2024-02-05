import { Perception } from './components/Perception'
import { Survival } from './components/Survival'
import { Medicine } from './components/Medicine'
import { Insight } from './components/Insight'
import { AnimalCare } from './components/AnimalCare'
import { GeneralInput } from '../GeneralInput'
import { useState } from 'react'
import { SkillWrapper } from '../SkillWrapper'

export const Wisdom = () => {
	const [generalInputValue, changeGeneralInputValue] = useState('0')
	return (
		<SkillWrapper>
			<div className='flex justify-between mt-4'>
				<span className='text-lg font-bold text-white'>Мудрость</span>
				<GeneralInput
					inputValue={generalInputValue}
					changeInputValue={changeGeneralInputValue}
				/>
			</div>
			<div className='flex flex-col pt-2 pl-2 w-full h-[180px] text-white overflow-y-auto'>
				<Perception />
				<Survival />
				<Medicine />
				<Insight />
				<AnimalCare />
			</div>
		</SkillWrapper>
	)
}
