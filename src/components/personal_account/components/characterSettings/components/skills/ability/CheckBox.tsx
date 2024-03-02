import clsx from 'clsx'
import { FC, useState } from 'react'
import { SwordSVG } from '../../../../../../../assets/svg'

interface IProps {
	changeInputValue: React.Dispatch<React.SetStateAction<string>>
}

export const CheckBox: FC<IProps> = ({ changeInputValue }) => {
	const [state, setState] = useState<0 | 2 | 4>(0)
	return (
		<button
			className='mr-4 relative min-w-[20px] max-w-[20px] min-h-[20px] max-h-[20px] overflow-hidden border-[1px] rotate-45'
			style={{ borderColor: '#dedede', color: '#dedede' }}
			onClick={() => {
				if (state === 0) {
					setState(2)
					changeInputValue(prev => (parseInt(prev) + 2).toString())
				}
				if (state === 2) {
					setState(4)
					changeInputValue(prev => (parseInt(prev) + 4).toString())
				}
				if (state === 4) {
					setState(0)
					changeInputValue(prev => (parseInt(prev) - 6).toString())
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
