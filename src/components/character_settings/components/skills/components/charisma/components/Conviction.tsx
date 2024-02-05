import { useState } from 'react'
import { Input } from '../../../ability/Input'
import { CheckBox } from '../../../ability/CheckBox'

export const Conviction = () => {
	const [inputValue, changeInputValue] = useState('0')

	return (
		<div className='flex w-full h-min'>
			<CheckBox changeInputValue={changeInputValue} />
			<Input inputValue={inputValue} changeInputValue={changeInputValue} />
			<span className='font-bold'>Убеждение</span>
		</div>
	)
}
