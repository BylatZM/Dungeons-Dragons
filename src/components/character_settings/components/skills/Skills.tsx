import { BodyType } from './components/BodyType'
import { Power } from './components/Power'
import { Charisma } from './components/charisma/Charisma'
import { Dexterity } from './components/dexterity/Dexterity'
import { Intelligence } from './components/intelligence/Intelligence'
import { Wisdom } from './components/wisdom/Wisdom'

export const Skills = () => {
	return (
		<div className='flex flex-col gap-y-4'>
			<Power />
			<BodyType />
			<Dexterity />
			<Wisdom />
			<Intelligence />
			<Charisma />
		</div>
	)
}
