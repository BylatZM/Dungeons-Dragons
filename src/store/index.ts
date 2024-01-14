import { combineReducers, configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { AuthSlice } from './slices/AuthSlice'
import { StoreState } from '../types/StatesTypes'

const reducers = combineReducers<StoreState>({
	AuthReducer: AuthSlice.reducer
})

export const store = configureStore({
	reducer: reducers,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(
			...(process.env.NODE_ENV !== 'production' ? [logger] : [])
		),
	devTools: true
})

export type RootState = ReturnType<typeof store.getState>
