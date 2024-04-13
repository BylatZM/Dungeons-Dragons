import { FC } from 'react'
import { IUpdatingFields } from '../../../../../../../types'

interface IProps {
	inputValue: string
	changeInputValue: React.Dispatch<React.SetStateAction<string>>
	updatingField: IUpdatingFields
	makeUpdateRequest: (
		updatingField: IUpdatingFields,
		new_value: number
	) => Promise<void>
}

export const Input: FC<IProps> = ({
	inputValue,
	changeInputValue,
	updatingField,
	makeUpdateRequest
}) => {
	return (
		<input
			type='text'
			className='outline-none border-[1px] rounded-full bg-inherit w-[25px] h-[25px] mr-4 text-sm'
			style={{ borderColor: '#dedede', color: '#dedede' }}
			value={!inputValue ? '' : inputValue}
			onBlur={e => {
				const value = parseInt(e.target.value)
				if (isNaN(value)) {
					changeInputValue('0')
					makeUpdateRequest(updatingField, 0)
				} else {
					changeInputValue(e.target.value)
					makeUpdateRequest(updatingField, parseInt(e.target.value))
				}
			}}
			onChange={e => {
				if (
					e.target.value !== '' &&
					e.target.value !== '-' &&
					(isNaN(parseInt(e.target.value)) || /[^\d-]/.test(e.target.value))
				) {
					changeInputValue('0')
					return
				}
				if (parseInt(e.target.value) < -10) {
					changeInputValue('-10')
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
