import { FC } from 'react'
import { ICharacterInfo } from '../../../../../../types'
import { Physique } from './components/Physique'
import { Power } from './components/Power'
import { Charisma } from './components/charisma/Charisma'
import { Dexterity } from './components/dexterity/Dexterity'
import { Intelligence } from './components/intelligence/Intelligence'
import { Wisdom } from './components/wisdom/Wisdom'

interface IProps {
	lastCharacterInfo: ICharacterInfo | null
}

export const Skills: FC<IProps> = ({ lastCharacterInfo }) => {
	return (
		<div className='flex flex-wrap justify-between min-w-[410px] max-w-[410px] h-fit '>
			<div className='flex flex-col h-fit w-fit'>
				<Power lastCharacterInfo={lastCharacterInfo} />
				<Charisma lastCharacterInfo={lastCharacterInfo} />
				<Intelligence lastCharacterInfo={lastCharacterInfo} />
			</div>
			<div className='flex flex-col h-fit w-fit'>
				<Physique lastCharacterInfo={lastCharacterInfo} />
				<Wisdom lastCharacterInfo={lastCharacterInfo} />
				<Dexterity lastCharacterInfo={lastCharacterInfo} />
			</div>
		</div>
	)
}
