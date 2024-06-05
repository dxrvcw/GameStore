import Image from 'next/image'
import styles from './page.module.css'

export default function GameStore({ searchParams }: { searchParams: any }) {
	console.log(searchParams)

	return (
		<div style={{ width: '100%' }}>
			<div className={styles['banner-container']}>
				<Image
					width={1200}
					height={675}
					src='/banner.webp'
					alt='Banner'
					className={styles.banner}
				/>
			</div>
			<p>dasdasdas</p>
		</div>
	)
}
