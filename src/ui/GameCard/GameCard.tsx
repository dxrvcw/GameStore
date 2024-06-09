import { IGameData } from '@/data/data'
import Image from 'next/image'
import styles from './GameCard.module.css'
import { GameCardControls } from './GameCardControls/GameCardControls'

export function GameCard({
	id,
	name,
	price,
	category,
	platform,
	image_url,
}: IGameData) {
	return (
		<div className={styles.cardContainer}>
			<div className={styles.imageContainer}>
				<Image
					src={'/games/' + image_url}
					alt={id}
					width={300}
					height={300}
					className={styles.image}
				/>
			</div>
			<p className={styles.title}>{name}</p>
			<p className={styles.desc}>
				{platform} | {category}
			</p>
			<div className={styles.footer}>
				<p className={styles.price}>${price}</p>
				<GameCardControls id={id} />
			</div>
		</div>
	)
}
