import { useState } from 'react'
import { Input } from '../../../ability/Input'
import { CheckBox } from '../../../ability/CheckBox'

export const Performance = () => {
	const [inputValue, changeInputValue] = useState('0')

	return (
		<div className='flex items-center w-full h-min'>
			<CheckBox changeInputValue={changeInputValue} />
			<Input inputValue={inputValue} changeInputValue={changeInputValue} />
			<span className='font-bold text-left'>
				Выступле-
				<br />
				ние
			</span>
		</div>
	)
}
