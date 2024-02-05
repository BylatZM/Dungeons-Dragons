import { FC } from 'react'

interface IProps {
	inputValue: string
	changeInputValue: React.Dispatch<React.SetStateAction<string>>
}

export const GeneralInput: FC<IProps> = ({ inputValue, changeInputValue }) => {
	return (
		<input
			type='text'
			value={inputValue}
			onBlur={e => {
				if (!e.target.value) changeInputValue('0')
			}}
			onChange={e => {
				if (
					(/[^\d]/.test(e.target.value) ||
						(e.target.value[0] === '0' && e.target.value.length > 1)) &&
					e.target.value
				) {
					changeInputValue('0')
					return
				}
				if (parseInt(e.target.value) > 30) {
					changeInputValue('30')
					return
				}
				changeInputValue(e.target.value)
			}}
			maxLength={2}
			className='border-white outline-none bg-inherit text-white border-[1px] rounded-full w-[30px] h-[30px] font-bold'
		/>
	)
}
