export interface IAuthRequest {
	username: string
	password: string
}

export interface IAuthSuccessResponse {
	token: string
	id: number
	username: string
}

export interface StoreState {
	AuthReducer: IAuthState
}

export interface IAuthState {
	token: string
	id: number
	username: string
	password: string
	error: IError | null
}

export interface IError {
	error: string
}

export interface IMessage {
	message: string
}

export interface ICube {
	K6: number
	K100: number
	K8: number
	K4: number
	K2: number
	K10: number
	K12: number
	K20: number
}

export type ICharacterGrade =
	| 'Бард'
	| 'Жрец'
	| 'Друид'
	| 'Монах'
	| 'Плут'
	| 'Колдун'
	| 'Варвар'
	| 'Воин'
	| 'Следопыт'
	| 'Паладин'
	| 'Чародей'
	| 'Волшебник'

export interface ICharacterCreateForm {
	name: string
	class: ICharacterGrade
	race: string
	image: File | null
}

export interface ICharacterInfo {
	id: number
	userId: number
	name: string
	characterClass: ICharacterGrade
	race: string
	imageLink: string
	lvl: number
	experience: number
	health: number
	strength: number
	physique: number
	dexterity: number
	wisdom: number
	intelligence: number
	charisma: number
	notes: string
	modifiers: ICharacterModifiers
}

export interface ICharacterModifiers {
	id: number
	athletics: number
	acrobatics: number
	sleightOfHand: number
	stealth: number
	perception: number
	survival: number
	medicine: number
	insight: number
	animalCare: number
	analysis: number
	history: number
	magic: number
	nature: number
	religion: number
	performance: number
	intimidation: number
	fraud: number
	conviction: number
}

export interface ICharacters {
	characters: ICharacterCard[]
}

export interface ICharacterCard {
	characterClass: ICharacterGrade
	race: string
	name: string
	imageLink: string
	characterLink: string
}
