import { useState } from 'react'
import { SkillWrapper } from './SkillWrapper'
import { GeneralInput } from './GeneralInput'

export const BodyType = () => {
	const [inputValue, changeInputValue] = useState('0')
	return (
		<SkillWrapper>
			<div className='flex justify-between mt-4 mb-1'>
				<span className='text-lg font-bold text-white'>Телосложение</span>
				<GeneralInput
					inputValue={inputValue}
					changeInputValue={changeInputValue}
				/>
			</div>
		</SkillWrapper>
	)
}
