import { useState } from 'react'
import { ICube } from '../../../../types/StatesTypes'
import {
	CubeK100SVG,
	CubeK10SVG,
	CubeK12SVG,
	CubeK20SVG,
	CubeK2SVG,
	CubeK4SVG,
	CubeK6SVG,
	CubeK8SVG
} from '../../../../assets/svg'
import clsx from 'clsx'
import { Parchment } from '../parchment/Parchment'

const initialCubeCounts: ICube = {
	K6: 0,
	K100: 0,
	K8: 0,
	K4: 0,
	K2: 0,
	K10: 0,
	K12: 0,
	K20: 0
}

export const Cube = () => {
	const [cubeCounts, changeCubeCounts] = useState<ICube>(initialCubeCounts)
	const [needShowCubes, changeNeedShowCubes] = useState(false)
	const [needShowParchment, changeNeedShowParchment] = useState(false)
	return (
		<>
			<Parchment
				needShow={needShowParchment}
				defaultClicks={initialCubeCounts}
				clickCount={cubeCounts}
				changeClickCount={changeCubeCounts}
				changeNeedShow={changeNeedShowParchment}
			/>
			<div
				style={{ backgroundColor: '#0F1440' }}
				className={clsx(
					'transitionGeneral fixed flex gap-x-2 h-fit p-2 bottom-10 right-10 z-40 rounded-md overflow-hidden',
					needShowCubes ? 'w-[710px]' : 'w-[85px]'
				)}
			>
				{!needShowCubes && (
					<button
						className='min-w-[70px] h-[70px] text-xs outline-none bg-black rounded-full text-white font-bold border-none'
						onClick={() => changeNeedShowCubes(true)}
					>
						Бросок
					</button>
				)}
				<CubeK6SVG
					clicksNumber={cubeCounts}
					changeClicksNumber={changeCubeCounts}
				/>
				<CubeK100SVG
					clicksNumber={cubeCounts}
					changeClicksNumber={changeCubeCounts}
				/>
				<CubeK8SVG
					clicksNumber={cubeCounts}
					changeClicksNumber={changeCubeCounts}
				/>
				<CubeK4SVG
					clicksNumber={cubeCounts}
					changeClicksNumber={changeCubeCounts}
				/>
				<CubeK2SVG
					clicksNumber={cubeCounts}
					changeClicksNumber={changeCubeCounts}
				/>
				<CubeK10SVG
					clicksNumber={cubeCounts}
					changeClicksNumber={changeCubeCounts}
				/>
				<CubeK12SVG
					clicksNumber={cubeCounts}
					changeClicksNumber={changeCubeCounts}
				/>
				<CubeK20SVG
					clicksNumber={cubeCounts}
					changeClicksNumber={changeCubeCounts}
				/>
				{cubeCounts.K10 === 0 &&
					cubeCounts.K100 === 0 &&
					cubeCounts.K12 === 0 &&
					cubeCounts.K2 === 0 &&
					cubeCounts.K20 === 0 &&
					cubeCounts.K4 === 0 &&
					cubeCounts.K6 === 0 &&
					cubeCounts.K8 === 0 &&
					needShowCubes && (
						<button
							className='w-[70px] h-[70px] text-xs outline-none bg-black rounded-full text-white font-bold border-none'
							onClick={() => changeNeedShowCubes(false)}
						>
							Закрыть
						</button>
					)}
				{(cubeCounts.K10 !== 0 ||
					cubeCounts.K100 !== 0 ||
					cubeCounts.K12 !== 0 ||
					cubeCounts.K2 !== 0 ||
					cubeCounts.K20 !== 0 ||
					cubeCounts.K4 !== 0 ||
					cubeCounts.K6 !== 0 ||
					cubeCounts.K8 !== 0) &&
					needShowCubes && (
						<button
							className='w-[70px] h-[70px] text-xs outline-none bg-black rounded-full text-white font-bold border-none'
							onClick={() => {
								changeNeedShowParchment(true)
							}}
						>
							Бросить
						</button>
					)}
			</div>
		</>
	)
}
