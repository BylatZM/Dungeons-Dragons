import { FC } from 'react'

interface IProps {
	inputValue: string
	changeInputValue: React.Dispatch<React.SetStateAction<string>>
}

export const Input: FC<IProps> = ({ inputValue, changeInputValue }) => {
	return (
		<input
			type='text'
			className='outline-none border-white border-[1px] rounded-full bg-inherit text-white w-[25px] h-[25px] mr-4 font-bold'
			value={!inputValue ? '' : inputValue}
			onBlur={e => {
				if (!e.target.value) changeInputValue('0')
			}}
			onChange={e => {
				if (/[^\d]/.test(e.target.value)) {
					changeInputValue('0')
					return
				}
				if (parseInt(e.target.value) > 30) {
					changeInputValue('30')
					return
				}
				changeInputValue(e.target.value)
			}}
		/>
	)
}
