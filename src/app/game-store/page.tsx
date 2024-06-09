import { fetchGames } from '@/data/data'
import { GameCard } from '@/ui/GameCard/GameCard'
import { IGamesSearch } from '@/ui/StoreSideBar/StoreSideBar'
import Image from 'next/image'
import styles from './page.module.css'

export default async function GameStore({
	searchParams,
}: {
	searchParams: IGamesSearch
}) {
	const games = await fetchGames(searchParams)

	return (
		<div style={{ width: '100%' }}>
			{!Object.keys(searchParams).length && (
				<div className={styles['banner-container']}>
					<Image
						width={1200}
						height={675}
						src='/banner.webp'
						alt='Banner'
						className={styles.banner}
					/>
				</div>
			)}
			{games.length ? (
				<div className={styles.gamesContainer}>
					{games.map(game => (
						<GameCard key={game.id} {...game} />
					))}
				</div>
			) : (
				<p>Oops... There is nothing to show ;(</p>
			)}
		</div>
	)
}
