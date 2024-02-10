import { GeneralInput } from '../GeneralInput'
import { SkillWrapper } from '../SkillWrapper'
import { Acrobatics } from './components/Acrobatics'
import { Legerdemain } from './components/Legerdemain'
import { Stealth } from './components/Stealth'
import { useState } from 'react'

export const Dexterity = () => {
	const [generalInputValue, changeGeneralInputValue] = useState('0')
	return (
		<SkillWrapper>
			<div className='flex justify-between mt-4'>
				<span className='text-xl font-bold text-white'>Ловкость</span>
				<GeneralInput
					inputValue={generalInputValue}
					changeInputValue={changeGeneralInputValue}
				/>
			</div>
			<div className='flex flex-col w-full h-min' style={{ color: '#dedede' }}>
				<Acrobatics />
				<Legerdemain />
				<Stealth />
			</div>
		</SkillWrapper>
	)
}
