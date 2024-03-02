import { FC, useEffect, useState } from 'react'
import { ICube } from '../../../../../../types'
import { clsx } from 'clsx'
import ParchmentBackground from '../../../../../../assets/images/ParchmentBackground.png'

interface IProps {
	needShow: boolean
	defaultClicks: ICube
	clickCount: ICube
	changeClickCount: React.Dispatch<React.SetStateAction<ICube>>
	changeNeedShow: React.Dispatch<React.SetStateAction<boolean>>
}

interface IResult {
	sum: number
	sum_line: string
	cube_line: string
}

interface ICubeInfo {
	sum: number
	sum_line: string
}

export const Parchment: FC<IProps> = ({
	needShow,
	defaultClicks,
	clickCount,
	changeClickCount,
	changeNeedShow
}) => {
	const [result, changeResult] = useState<IResult | null>(null)

	const getCubeInfo = (verges: number, clickCount: number): ICubeInfo => {
		let res: ICubeInfo = {
			sum: 0,
			sum_line: ''
		}
		for (let i = 1; i <= clickCount; i++) {
			const ran = Math.floor(Math.random() * verges) + 1
			res.sum = res.sum + ran
			res.sum_line = res.sum_line + ran + ' '
		}
		res.sum_line = '(' + res.sum_line.trim() + ')'
		return res
	}

	useEffect(() => {
		if (!needShow || result) return
		let res: IResult = {
			sum: 0,
			sum_line: '',
			cube_line: ''
		}
		let func_res: ICubeInfo | null = null
		if (clickCount.K6 !== 0) {
			res.cube_line += `${clickCount.K6}K6 `
			func_res = getCubeInfo(6, clickCount.K6)
			res.sum = res.sum + func_res.sum
			res.sum_line = res.sum_line + func_res.sum_line + ' '
		}
		if (clickCount.K100 !== 0) {
			res.cube_line += `${clickCount.K100}K100 `
			func_res = getCubeInfo(100, clickCount.K100)
			res.sum = res.sum + func_res.sum
			res.sum_line = res.sum_line + func_res.sum_line + ' '
		}
		if (clickCount.K8 !== 0) {
			res.cube_line += `${clickCount.K8}K8 `
			func_res = getCubeInfo(8, clickCount.K8)
			res.sum = res.sum + func_res.sum
			res.sum_line = res.sum_line + func_res.sum_line + ' '
		}
		if (clickCount.K4 !== 0) {
			res.cube_line += `${clickCount.K4}K4 `
			func_res = getCubeInfo(4, clickCount.K4)
			res.sum = res.sum + func_res.sum
			res.sum_line = res.sum_line + func_res.sum_line + ' '
		}
		if (clickCount.K2 !== 0) {
			res.cube_line += `${clickCount.K2}K2 `
			func_res = getCubeInfo(2, clickCount.K2)
			res.sum = res.sum + func_res.sum
			res.sum_line = res.sum_line + func_res.sum_line + ' '
		}
		if (clickCount.K10 !== 0) {
			res.cube_line += `${clickCount.K10}K10 `
			func_res = getCubeInfo(10, clickCount.K10)
			res.sum = res.sum + func_res.sum
			res.sum_line = res.sum_line + func_res.sum_line + ' '
		}
		if (clickCount.K12 !== 0) {
			res.cube_line += `${clickCount.K12}K12 `
			func_res = getCubeInfo(12, clickCount.K12)
			res.sum = res.sum + func_res.sum
			res.sum_line = res.sum_line + func_res.sum_line + ' '
		}
		if (clickCount.K20 !== 0) {
			res.cube_line += `${clickCount.K20}K20 `
			func_res = getCubeInfo(20, clickCount.K20)
			res.sum = res.sum + func_res.sum
			res.sum_line = res.sum_line + func_res.sum_line + ' '
		}
		res.sum_line = res.sum_line.trim().replace(/ /g, ' + ')
		res.cube_line = res.cube_line.trim().replace(/ /g, ' + ')
		changeResult(res)
	}, [needShow, clickCount, result])

	return (
		<button
			className={clsx(
				'transitionGeneral outline-none border-none fixed inset-0 min-h-screen bg-gray-300 bg-opacity-10 backdrop-blur-md z-[60] overflow-hidden flex justify-start items-end',
				needShow ? 'w-full' : 'w-0'
			)}
			onClick={() => {
				changeNeedShow(false)
				changeClickCount(defaultClicks)
				changeResult(null)
			}}
		>
			<div
				className={clsx(
					'transitionFast min-w-[300px] min-h-[200px] relative mb-10 ml-10',
					result ? 'opacity-100' : 'opacity-0'
				)}
			>
				<img
					src={ParchmentBackground}
					className='absolute w-full h-full pointer-events-none z-[-1]'
					alt='фото пергаментной бумаги'
				/>
				<div className='w-full text-black font-bold flex p-10'>
					<div className='flex flex-col w-full h-full gap-y-4'>
						<div className='text-3xl text-left mt-3'>Бросок</div>
						<div className='flex flex-col gap-y-2 max-w-[200px]'>
							<div className='text-left'>{result ? result.sum_line : ''}</div>
							{result && (
								<div className='text-gray-500 text-sm text-left'>
									{result.cube_line}
								</div>
							)}
						</div>
					</div>
					<div className='w-fit h-fit text-5xl'>{result ? result.sum : ''}</div>
				</div>
			</div>
		</button>
	)
}
