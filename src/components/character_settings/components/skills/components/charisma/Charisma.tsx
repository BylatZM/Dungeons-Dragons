import { Performance } from './components/Performance'
import { Intimidation } from './components/Intimidation'
import { Deception } from './components/Deception'
import { Conviction } from './components/Conviction'
import { GeneralInput } from '../GeneralInput'
import { useState } from 'react'
import { SkillWrapper } from '../SkillWrapper'

export const Charisma = () => {
	const [generalInputValue, changeGeneralInputValue] = useState('0')
	return (
		<SkillWrapper>
			<div className='flex justify-between mt-4'>
				<span className='text-xl font-bold text-white'>Харизма</span>
				<GeneralInput
					inputValue={generalInputValue}
					changeInputValue={changeGeneralInputValue}
				/>
			</div>
			<div
				className='flex flex-col gap-y-2 pt-2 pl-2 w-full h-fit'
				style={{ color: '#dedede' }}
			>
				<Performance />
				<Intimidation />
				<Deception />
				<Conviction />
			</div>
		</SkillWrapper>
	)
}
