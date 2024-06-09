'use client'

import { IGameData } from '@/data/data'
import { useBoundStore, useInitializeCart } from '@/store/store'
import { CartListItem } from '../CartListItem/CartListItem'

import styles from './CartList.module.css'

export function CartList({ games }: { games: IGameData[] }) {
	useInitializeCart()

	const cart = useBoundStore(store => store.cart)

	const filteredGames = games.filter(game => cart.includes(game.id))

	return (
		<>
			<div className={styles.cartContainer}>
				{cart.length ? (
					<>
						{filteredGames.map(game => (
							<CartListItem key={game.id} {...game} />
						))}
						<p className={styles.totalPrice}>
							Total price:{' '}
							<span className={styles.price}>
								${filteredGames.reduce((acc, game) => acc + game.price, 0)}
							</span>
						</p>
						<div className={styles.btnContainer}>
							<button className={styles.orderBtn}>Create order</button>
						</div>
					</>
				) : (
					<p className={styles.cartError}>Cart is empty!</p>
				)}
			</div>
		</>
	)
}
