import clsx from 'clsx'
import { FC, useEffect, useState } from 'react'
import { SwordSVG } from '../../../../../../../assets/svg'
import { IUpdatingFields } from '../../../../../../../types'
import { useTypedSelector } from '../../../../../../hooks/useTypedSelection'

interface IProps {
	bonusValue: number
	updatingField: IUpdatingFields
	makeUpdateRequest: (
		updatingField: IUpdatingFields,
		new_value: number
	) => Promise<void>
}

export const CheckBox: FC<IProps> = ({
	bonusValue,
	updatingField,
	makeUpdateRequest
}) => {
	const [state, setState] = useState<number>(0)
	const { isInitializedData } = useTypedSelector(state => state.Character)

	useEffect(() => {
		if (isInitializedData) setState(bonusValue)
		if (!isInitializedData) setState(0)
	}, [isInitializedData])

	return (
		<button
			className='mr-4 relative min-w-[20px] max-w-[20px] min-h-[20px] max-h-[20px] overflow-hidden border-[1px] rotate-45'
			style={{ borderColor: '#dedede', color: '#dedede' }}
			onClick={() => {
				if (state === 0) {
					setState(2)
					makeUpdateRequest(updatingField, 2)
				}
				if (state === 2) {
					setState(4)
					makeUpdateRequest(updatingField, 4)
				}
				if (state === 4) {
					setState(0)
					makeUpdateRequest(updatingField, 0)
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
