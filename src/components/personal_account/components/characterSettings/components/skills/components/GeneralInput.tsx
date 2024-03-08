import { FC } from 'react'
import { IUpdatingFields } from '../../../../../../../types'

interface IProps {
	inputValue: string
	changeInputValue: (value: number) => void
	updatingField: IUpdatingFields
	makeUpdateRequest: (
		updatingField: IUpdatingFields,
		new_value: number
	) => Promise<void>
}

export const GeneralInput: FC<IProps> = ({
	inputValue,
	changeInputValue,
	updatingField,
	makeUpdateRequest
}) => {
	return (
		<input
			type='text'
			value={inputValue}
			className='outline-none bg-inherit border-[1px] rounded-full w-[30px] h-[30px] text-lg'
			style={{ borderColor: '#dedede', color: '#dedede' }}
			onBlur={e => {
				const value = parseInt(e.target.value.replaceAll(/[^\d]/gi, ''))
				if (isNaN(value)) changeInputValue(1)
				else {
					changeInputValue(value)
					makeUpdateRequest(updatingField, value)
				}
			}}
			onChange={e => {
				if (
					isNaN(parseInt(e.target.value)) ||
					/[^\d]/.test(e.target.value) ||
					parseInt(e.target.value) === 0
				) {
					changeInputValue(0)
					return
				}
				if (parseInt(e.target.value) > 30) {
					changeInputValue(30)
					return
				}
				changeInputValue(parseInt(e.target.value))
			}}
		/>
	)
}
