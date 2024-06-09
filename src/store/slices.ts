import Cookies from 'js-cookie'
import { StateCreator } from 'zustand'

// Cart Slice
export interface ICartSlice {
	cart: string[]
	addToCart: (id: string) => void
	removeFromCart: (id: string) => void
	initializeCart: () => void
}

export const cartSlice: StateCreator<ICartSlice, [], [], ICartSlice> = set => ({
	cart: [],

	addToCart: id => {
		set(state => {
			const newCart = [...state.cart, id]
			Cookies.set('cart', JSON.stringify(newCart))
			return { cart: newCart }
		})
	},

	removeFromCart: id => {
		set(state => {
			const newCart = state.cart.filter(cartItem => cartItem !== id)
			Cookies.set('cart', JSON.stringify(newCart))
			return { cart: newCart }
		})
	},

	initializeCart: () => {
		const cartFromCookies = Cookies.get('cart')
			? JSON.parse(Cookies.get('cart')!)
			: []
		set({ cart: cartFromCookies })
	},
})

// Favorites Slice
export interface IFavoritesSlice {
	favorites: string[]
	addToFavorites: (id: string) => void
	removeFromFavorites: (id: string) => void
	initializeFavorites: () => void
}

export const favoritesSlice: StateCreator<
	IFavoritesSlice,
	[],
	[],
	IFavoritesSlice
> = set => ({
	favorites: [],

	addToFavorites: id => {
		set(state => {
			const newFavorites = [...state.favorites, id]
			Cookies.set('favorites', JSON.stringify(newFavorites))
			return { favorites: newFavorites }
		})
	},

	removeFromFavorites: id => {
		set(state => {
			const newFavorites = state.favorites.filter(favorite => favorite !== id)
			Cookies.set('favorites', JSON.stringify(newFavorites))
			return { favorites: newFavorites }
		})
	},

	initializeFavorites: () => {
		const favoritesFromCookies = Cookies.get('favorites')
			? JSON.parse(Cookies.get('favorites')!)
			: []
		set({ favorites: favoritesFromCookies })
	},
})
