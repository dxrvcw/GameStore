import { fetchGames } from '@/data/data'
import { FavoritesList } from '@/ui/FavoritesList/FavoritesList'
import styles from './page.module.css'

export default async function FavoritesPage() {
	const games = await fetchGames()

	return (
		<div>
			<p className={styles.heading}>Your favorites</p>
			<FavoritesList games={games} />
		</div>
	)
}
