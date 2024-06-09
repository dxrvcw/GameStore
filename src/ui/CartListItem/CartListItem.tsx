'use client'

import { IGameData } from '@/data/data'
import { useBoundStore } from '@/store/store'
import Image from 'next/image'
import { BsCartXFill } from 'react-icons/bs'
import styles from './CartListItem.module.css'

export function CartListItem({
	id,
	name,
	price,
	category,
	platform,
	image_url,
}: IGameData) {
	const removeFromCart = useBoundStore(store => store.removeFromCart)
	return (
		<div className={styles.itemContainer}>
			<div className={styles.imageContainer}>
				<Image
					src={'/games/' + image_url}
					alt={name}
					width={100}
					height={100}
					className={styles.image}
				/>
			</div>
			<div className={styles.infoContainer}>
				<p className={styles.name}>{name}</p>
				<p className={styles.price}>${price}</p>
				<p className={styles.category}>
					{category} | {platform}
				</p>
			</div>
			<button className={styles.button} onClick={() => removeFromCart(id)}>
				<BsCartXFill className='icon' />
			</button>
		</div>
	)
}
