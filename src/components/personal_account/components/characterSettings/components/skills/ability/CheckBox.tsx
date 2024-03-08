import clsx from 'clsx'
import { FC, useEffect, useState } from 'react'
import { SwordSVG } from '../../../../../../../assets/svg'
import { IUpdatingFields } from '../../../../../../../types'
import { useTypedSelector } from '../../../../../../hooks/useTypedSelection'

interface IProps {
	inputValue: string
	changeInputValue: (value: string) => void
	updatingField: IUpdatingFields
	makeUpdateRequest: (
		updatingField: IUpdatingFields,
		new_value: number
	) => Promise<void>
}

export const CheckBox: FC<IProps> = ({
	inputValue,
	changeInputValue,
	updatingField,
	makeUpdateRequest
}) => {
	const [state, setState] = useState<0 | 2 | 4>(0)
	const { isInitializedData } = useTypedSelector(state => state.Character)

	const InputValueCorrecter = (result: number): string => {
		if (result > 10) return '10'
		if (result < -10) return '-10'
		return result.toString()
	}

	useEffect(() => {
		if (!isInitializedData) setState(0)
	}, [isInitializedData])

	return (
		<button
			className='mr-4 relative min-w-[20px] max-w-[20px] min-h-[20px] max-h-[20px] overflow-hidden border-[1px] rotate-45'
			style={{ borderColor: '#dedede', color: '#dedede' }}
			onClick={() => {
				const value = parseInt(inputValue)
				if (state === 0 && !isNaN(value)) {
					setState(2)
					changeInputValue(InputValueCorrecter(value + 2))
					makeUpdateRequest(
						updatingField,
						parseInt(InputValueCorrecter(value + 2))
					)
				}
				if (state === 2 && !isNaN(value)) {
					setState(4)
					changeInputValue(InputValueCorrecter(value + 2))
					makeUpdateRequest(
						updatingField,
						parseInt(InputValueCorrecter(value + 2))
					)
				}
				if (state === 4 && !isNaN(value)) {
					setState(0)
					changeInputValue(InputValueCorrecter(value - 6))
					makeUpdateRequest(
						updatingField,
						parseInt(InputValueCorrecter(value - 6))
					)
				}
			}}
		>
			<div
				className={clsx(
					'transitionFast absolute inset-0 w-fit h-fit',
					state !== 0
						? 'opacity-100 rotate-[-90deg]'
						: 'opacity-0 rotate-[0deg]'
				)}
			>
				<SwordSVG />
			</div>
			<div
				className={clsx(
					'transitionFast absolute inset-0 w-fit h-fit m-auto',
					state === 4 ? 'opacity-100' : 'opacity-0'
				)}
			>
				<SwordSVG />
			</div>
		</button>
	)
}
