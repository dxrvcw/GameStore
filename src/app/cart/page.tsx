import { fetchGames } from '@/data/data'
import { CartList } from '@/ui/CartList/CartList'

import styles from './page.module.css'

export default async function CartPage() {
	const games = await fetchGames()
	return (
		<div>
			<p className={styles.title}>Your cart</p>
			<CartList games={games} />
		</div>
	)
}
