'use client'

import { IGameData } from '@/data/data'
import { useBoundStore } from '@/store/store'
import { GameCard } from '../GameCard/GameCard'
import styles from './FavoritesList.module.css'

interface IFavoriteListProps {
	games: IGameData[]
}

export function FavoritesList({ games }: IFavoriteListProps) {
	const favorites = useBoundStore(state => state.favorites)
	return (
		<div>
			{favorites.length ? (
				<div className={styles.listContainer}>
					{games
						.filter(game => favorites.includes(game.id))
						.map(game => (
							<GameCard {...game} />
						))}
				</div>
			) : (
				<p className={styles.error}>No favorites yet!</p>
			)}
		</div>
	)
}
