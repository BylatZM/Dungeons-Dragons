export interface IAuthRequest {
	username: string
	password: string
}

export interface IAuthSuccessResponse {
	token: string
	id: number
	username: string
}

export interface ICharacterState {
	currentCharacterInfo: ICharacterInfo
	characterClasses: ICharacterGrade[]
	isInitializedData: boolean
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
	sessionStatus: 'expired' | null
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
	bonuses: ICharacterBonuses
}

export interface ICharacterBonuses {
	id: number
	athleticsBonus: number
	acrobaticsBonus: number
	sleightOfHandBonus: number
	stealthBonus: number
	perceptionBonus: number
	survivalBonus: number
	medicineBonus: number
	insightBonus: number
	animalCareBonus: number
	analysisBonus: number
	historyBonus: number
	magicBonus: number
	natureBonus: number
	religionBonus: number
	performanceBonus: number
	intimidationBonus: number
	fraudBonus: number
	convictionBonus: number
}

export interface ICharacters {
	characters: ICharacterCard[]
}

export interface ICharacterCard {
	characterClass: ICharacterGrade
	race: string
	name: string
	imageLink: string | null
	characterLink: string
}

export interface ICharacterUpdate {
	characterId: number
	newValues: IUpdatingValues
}

export interface IUpdatingValues {
	athletics?: number
	acrobatics?: number
	sleightOfHand?: number
	stealth?: number
	perception?: number
	survival?: number
	medicine?: number
	insight?: number
	animalCare?: number
	analysis?: number
	history?: number
	magic?: number
	nature?: number
	religion?: number
	performance?: number
	intimidation?: number
	fraud?: number
	conviction?: number
	name?: string
	characterClass?: ICharacterGrade
	race?: string
	lvl?: number
	experience?: number
	health?: number
	strength?: number
	physique?: number
	dexterity?: number
	wisdom?: number
	intelligence?: number
	charisma?: number
	notes?: string
	athleticsBonus?: number
	acrobaticsBonus?: number
	sleightOfHandBonus?: number
	stealthBonus?: number
	perceptionBonus?: number
	survivalBonus?: number
	medicineBonus?: number
	insightBonus?: number
	animalCareBonus?: number
	analysisBonus?: number
	historyBonus?: number
	magicBonus?: number
	natureBonus?: number
	religionBonus?: number
	performanceBonus?: number
	intimidationBonus?: number
	fraudBonus?: number
	convictionBonus?: number
}

export type IUpdatingFields =
	| 'athletics'
	| 'acrobatics'
	| 'sleightOfHand'
	| 'stealth'
	| 'perception'
	| 'survival'
	| 'medicine'
	| 'insight'
	| 'animalCare'
	| 'analysis'
	| 'history'
	| 'magic'
	| 'nature'
	| 'religion'
	| 'performance'
	| 'intimidation'
	| 'fraud'
	| 'conviction'
	| 'name'
	| 'characterClass'
	| 'race'
	| 'lvl'
	| 'experience'
	| 'health'
	| 'strength'
	| 'physique'
	| 'dexterity'
	| 'wisdom'
	| 'intelligence'
	| 'charisma'
	| 'notes'
	| 'athleticsBonus'
	| 'acrobaticsBonus'
	| 'sleightOfHandBonus'
	| 'stealthBonus'
	| 'perceptionBonus'
	| 'survivalBonus'
	| 'medicineBonus'
	| 'insightBonus'
	| 'animalCareBonus'
	| 'analysisBonus'
	| 'historyBonus'
	| 'magicBonus'
	| 'natureBonus'
	| 'religionBonus'
	| 'performanceBonus'
	| 'intimidationBonus'
	| 'fraudBonus'
	| 'convictionBonus'
