import { FC } from 'react'

interface IProps {
	inputValue: string
	changeInputValue: React.Dispatch<React.SetStateAction<string>>
}

export const Input: FC<IProps> = ({ inputValue, changeInputValue }) => {
	return (
		<input
			type='text'
			className='outline-none border-[1px] rounded-full bg-inherit w-[25px] h-[25px] mr-4 text-sm'
			style={{ borderColor: '#dedede', color: '#dedede' }}
			value={!inputValue ? '' : inputValue}
			onBlur={e => {
				const value = parseInt(e.target.value)
				if (isNaN(value)) changeInputValue('0')
				else {
					if (value > 0) changeInputValue(`+${value.toString()}`)
					else changeInputValue(value.toString())
				}
			}}
			onChange={e => {
				if (
					e.target.value !== '' &&
					e.target.value !== '+' &&
					e.target.value !== '-' &&
					(isNaN(parseInt(e.target.value)) || /[^\d+-]/.test(e.target.value))
				) {
					changeInputValue('0')
					return
				}
				if (parseInt(e.target.value) > 0 && !/\+/.test(e.target.value)) {
					changeInputValue(`+${e.target.value}`)
					return
				}
				if (parseInt(e.target.value) < -10) {
					changeInputValue('-10')
					return
				}
				if (parseInt(e.target.value) > 10) {
					changeInputValue('+10')
					return
				}
				changeInputValue(e.target.value)
			}}
		/>
	)
}
