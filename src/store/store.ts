import { useEffect } from 'react'
import { create } from 'zustand'
import {
	ICartSlice,
	IFavoritesSlice,
	cartSlice,
	favoritesSlice,
} from './slices'

export const useBoundStore = create<IFavoritesSlice & ICartSlice>()((...a) => ({
	...favoritesSlice(...a),
	...cartSlice(...a),
}))

export const useInitializeFavorites = () => {
	const initializeFavorites = useBoundStore(state => state.initializeFavorites)

	useEffect(() => {
		initializeFavorites()
	}, [initializeFavorites])
}
export const useInitializeCart = () => {
	const initializeCart = useBoundStore(state => state.initializeCart)

	useEffect(() => {
		initializeCart()
	}, [initializeCart])
}
