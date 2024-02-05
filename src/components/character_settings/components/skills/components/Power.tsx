import { useState } from 'react'
import { CheckBox } from '../ability/CheckBox'
import { Input } from '../ability/Input'
import { GeneralInput } from './GeneralInput'
import { SkillWrapper } from './SkillWrapper'

export const Power = () => {
	const [generalInputValue, changeGeneralInputValue] = useState('0')
	const [inputValue, changeInputValue] = useState('0')

	return (
		<SkillWrapper>
			<div className='flex justify-between mt-4'>
				<span className='font-bold text-lg text-white'>Сила</span>
				<GeneralInput
					inputValue={generalInputValue}
					changeInputValue={changeGeneralInputValue}
				/>
			</div>
			<div className='flex w-full h-min text-white'>
				<CheckBox changeInputValue={changeInputValue} />
				<Input inputValue={inputValue} changeInputValue={changeInputValue} />
				<span className='font-bold'>Атлетика</span>
			</div>
		</SkillWrapper>
	)
}
