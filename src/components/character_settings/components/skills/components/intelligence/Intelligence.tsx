import { Analysis } from './components/Analysis'
import { History } from './components/History'
import { Magic } from './components/Magic'
import { Nature } from './components/Nature'
import { Religion } from './components/Religion'
import { useState } from 'react'
import { SkillWrapper } from '../SkillWrapper'
import { GeneralInput } from '../GeneralInput'

export const Intelligence = () => {
	const [generalInputValue, changeGeneralInputValue] = useState('0')
	return (
		<SkillWrapper>
			<div className='flex justify-between mt-4'>
				<span className='text-xl font-bold text-white'>Интеллект</span>
				<GeneralInput
					inputValue={generalInputValue}
					changeInputValue={changeGeneralInputValue}
				/>
			</div>
			<div
				className='flex flex-col gap-y-2 w-full h-fit pl-2 pt-2'
				style={{ color: '#dedede' }}
			>
				<Analysis />
				<History />
				<Magic />
				<Nature />
				<Religion />
			</div>
		</SkillWrapper>
	)
}
