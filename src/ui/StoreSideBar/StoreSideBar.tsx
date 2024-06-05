'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BiLogoInstagramAlt } from 'react-icons/bi'
import { TiSocialTwitter, TiSocialYoutube } from 'react-icons/ti'
import { Checkbox } from '../Checkbox/Checkbox'
import { LinkComponent } from '../LinkComponent/LinkComponent'
import styles from './StoreSideBar.module.css'

export const categories = [
	'Indy',
	'Adventure',
	'MMO',
	'Casual game',
	'Strategy',
	'Simulator',
	'Sports Game',
	'Action Game',
]

export const platforms = [
	'PC',
	'PlayStation 5',
	'PlayStation 4',
	'Xbox Series',
	'Nintendo Switch',
]

interface ISearchParams {
	categories: string[]
	platforms: string[]
	minPrice?: number
	maxPrice?: number
}

export function StoreSideBar() {
	const [searchParams, setSearchParams] = useState<ISearchParams>({
		categories: [],
		platforms: [],
		minPrice: undefined,
		maxPrice: undefined,
	})

	const pathname = usePathname()
	const { replace } = useRouter()

	const handleCheckbox = (type: 'categories' | 'platforms', value: string) => {
		setSearchParams(prev => {
			const currentValues = prev[type]
			const updatedValues = currentValues.includes(value)
				? currentValues.filter(v => v !== value)
				: [...currentValues, value]
			return { ...prev, [type]: updatedValues }
		})
	}

	const handlePriceChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		type: 'minPrice' | 'maxPrice'
	) => {
		const value = parseInt(e.target.value, 10)
		setSearchParams(prev => ({
			...prev,
			[type]: isNaN(value) ? undefined : value,
		}))
	}

	useEffect(() => {
		const query = new URLSearchParams()

		searchParams.categories.forEach(category =>
			query.append('categories', category)
		)
		searchParams.platforms.forEach(platform =>
			query.append('platforms', platform)
		)
		if (searchParams.minPrice !== undefined)
			query.append('minPrice', searchParams.minPrice.toString())
		if (searchParams.maxPrice !== undefined)
			query.append('maxPrice', searchParams.maxPrice.toString())

		replace(`${pathname}?${query.toString()}`)
	}, [searchParams])

	return (
		<div>
			<aside className={styles.sidebar}>
				<div className={styles.form}>
					<p className={styles.title}>Categories</p>
					{categories.map(category => (
						<Checkbox
							key={category}
							name={category}
							onChange={() => handleCheckbox('categories', category)}
							checked={searchParams.categories.includes(category)}
						/>
					))}
				</div>
				<div className={styles.form}>
					<p className={styles.title}>Platforms</p>
					{platforms.map(platform => (
						<Checkbox
							key={platform}
							name={platform}
							onChange={() => handleCheckbox('platforms', platform)}
							checked={searchParams.platforms.includes(platform)}
						/>
					))}
				</div>
				<div className={styles.form}>
					<p className={styles.title}>Price</p>
					<div className={styles.priceRange}>
						<input
							type='number'
							placeholder='Min'
							className={styles.priceInput}
							onChange={e => handlePriceChange(e, 'minPrice')}
						/>
						<p>-</p>
						<input
							type='number'
							placeholder='Max'
							className={styles.priceInput}
							onChange={e => handlePriceChange(e, 'maxPrice')}
						/>
					</div>
				</div>
			</aside>
			<ul className={styles.socials}>
				<li>
					<LinkComponent href='/'>
						<TiSocialYoutube className={styles.socialIcon} />
					</LinkComponent>
				</li>
				<li>
					<LinkComponent href='/'>
						<TiSocialTwitter className={styles.socialIcon} />
					</LinkComponent>
				</li>
				<li>
					<LinkComponent href='/'>
						<BiLogoInstagramAlt className={styles.socialIcon} />
					</LinkComponent>
				</li>
			</ul>
		</div>
	)
}
