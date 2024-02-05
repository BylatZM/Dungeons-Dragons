import { useState } from 'react'
import { CheckBox } from '../../../ability/CheckBox'
import { Input } from '../../../ability/Input'

export const Legerdemain = () => {
	const [inputValue, changeInputValue] = useState('0')
	return (
		<div className='flex items-center w-full h-min'>
			<CheckBox changeInputValue={changeInputValue} />
			<Input inputValue={inputValue} changeInputValue={changeInputValue} />
			<span className='font-bold'>Ловкость рук</span>
		</div>
	)
}
