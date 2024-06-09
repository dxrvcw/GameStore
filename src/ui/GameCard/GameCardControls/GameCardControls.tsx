'use client'

import {
	useBoundStore,
	useInitializeCart,
	useInitializeFavorites,
} from '@/store/store'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { HiOutlineShoppingCart, HiShoppingCart } from 'react-icons/hi'
import styles from './GameCardControls.module.css'

export function GameCardControls({ id }: { id: string }) {
	useInitializeFavorites()
	useInitializeCart()

	const favorites = useBoundStore(state => state.favorites)
	const removeFromFavorites = useBoundStore(state => state.removeFromFavorites)
	const addToFavorites = useBoundStore(state => state.addToFavorites)

	const cart = useBoundStore(state => state.cart)
	const addToCart = useBoundStore(state => state.addToCart)
	const removeFromCart = useBoundStore(state => state.removeFromCart)

	const handleAddToFavorites = (id: string) => {
		addToFavorites(id)
	}

	const handleRemoveFromFavorites = (id: string) => {
		removeFromFavorites(id)
	}

	const handleAddToCart = (id: string) => {
		addToCart(id)
	}

	const handleRemoveFromCart = (id: string) => {
		removeFromCart(id)
	}

	return (
		<div className={styles.gameCardControls}>
			{favorites.includes(id) ? (
				<button
					className={styles.favoriteBtn}
					onClick={() => handleRemoveFromFavorites(id)}
				>
					<FaHeart />
				</button>
			) : (
				<button
					className={styles.favoriteBtn}
					onClick={() => handleAddToFavorites(id)}
				>
					<FaRegHeart />
				</button>
			)}
			{cart.includes(id) ? (
				<button
					className={styles.cartBtn}
					onClick={() => handleRemoveFromCart(id)}
				>
					<HiShoppingCart />
				</button>
			) : (
				<button className={styles.cartBtn} onClick={() => handleAddToCart(id)}>
					<HiOutlineShoppingCart />
				</button>
			)}
		</div>
	)
}
