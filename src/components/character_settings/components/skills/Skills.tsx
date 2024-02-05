import { BodyType } from './components/BodyType'
import { Power } from './components/Power'
import { Charisma } from './components/charisma/Charisma'
import { Dexterity } from './components/dexterity/Dexterity'
import { Intelligence } from './components/intelligence/Intelligence'
import { Wisdom } from './components/wisdom/Wisdom'

export const Skills = () => {
	return (
		<div className='flex flex-wrap justify-between min-w-[410px] max-w-[410px] h-fit '>
			<div className='flex flex-col h-fit w-fit'>
				<Power />
				<Charisma />
				<Intelligence />
			</div>
			<div className='flex flex-col h-fit w-fit'>
				<BodyType />
				<Wisdom />
				<Dexterity />
			</div>
		</div>
	)
}
