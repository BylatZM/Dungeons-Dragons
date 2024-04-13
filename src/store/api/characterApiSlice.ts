import { ICharacterInfo, ICharacterUpdate, ICharacters } from '../../types'
import { apiSlice } from './apiSlice'

export const characterApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getCharacters: builder.query<ICharacters, void>({
			query: () => {
				return {
					url: 'character/get',
					method: 'GET',
					headers: {
						'Content-Type': 'application/json; charset=utf-8'
					}
				}
			}
		}),
		updateCharacter: builder.mutation<ICharacterInfo | void, ICharacterUpdate>({
			query: credential => {
				return {
					url: 'character/update',
					method: 'PATCH',
					body: credential
				}
			}
		})
	})
})

export const createCharacter = async (data: FormData): Promise<200 | void> => {
	if (!data.has('race') || !data.has('name') || !data.has('class')) {
		return
	}

	const token = localStorage.getItem('token')
	if (!token) {
		alert('The session has expired, please log in again')
		return
	}

	const response = await fetch(
		'http://95.214.11.83:8080/api/character/create',
		{
			headers: {
				Accept: 'application/json; charset=utf-8',
				Authorization: `Bearer ${token}`
			},
			method: 'POST',
			body: data
		}
	).then(response => response.json())

	if ('userId' in response) {
		return response
	}

	alert('The session has expired, please log in again')
	return
}

export const getCurrentCharacter = async (
	character_id: string
): Promise<ICharacterInfo | void> => {
	const token = localStorage.getItem('token')
	if (!token) {
		alert('The session has expired, please log in again')
		return
	}

	const response = await fetch(
		'http://95.214.11.83:8080/api/character/' + character_id,
		{
			headers: {
				Accept: 'application/json; charset=utf-8',
				Authorization: `Bearer ${token}`
			},
			method: 'GET'
		}
	).then(response => response.json())

	if ('userId' in response) {
		return response
	}

	alert('The session has expired, please log in again')
	return
}

export const { useGetCharactersQuery, useUpdateCharacterMutation } =
	characterApiSlice
