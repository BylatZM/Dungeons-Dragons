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
			className='outline-none bg-inherit border-[1px] rounded-full w-[30px] h-[30px] text-lg'
			style={{ borderColor: '#dedede', color: '#dedede' }}
			onBlur={e => {
				const value = parseInt(e.target.value.replaceAll(/[^\d]/gi, ''))
				if (isNaN(value)) changeInputValue('0')
				else changeInputValue(value.toString())
			}}
			onChange={e => {
				if (
					e.target.value !== '' &&
					(isNaN(parseInt(e.target.value)) || /[^\d]/.test(e.target.value))
				) {
					changeInputValue('0')
					return
				}
				if (parseInt(e.target.value) > 10) {
					changeInputValue('10')
					return
				}
				changeInputValue(e.target.value)
			}}
		/>
	)
}
