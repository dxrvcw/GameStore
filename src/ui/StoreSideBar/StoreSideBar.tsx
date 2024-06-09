'use client'

import debounce from 'debounce'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BiLogoInstagramAlt } from 'react-icons/bi'
import { TiSocialTwitter, TiSocialYoutube } from 'react-icons/ti'
import { Checkbox } from '../Checkbox/Checkbox'
import { LinkComponent } from '../LinkComponent/LinkComponent'
import styles from './StoreSideBar.module.css'

export interface IGamesSearch {
	categories: string[]
	platforms: string[]
	minPrice?: number
	maxPrice?: number
	search?: string
}

export function StoreSideBar({
	categories,
	platforms,
}: {
	categories: string[]
	platforms: string[]
}) {
	const [searchParams, setSearchParams] = useState<IGamesSearch>({
		categories: [],
		platforms: [],
		minPrice: undefined,
		maxPrice: undefined,
		search: '',
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

	const handlePriceChange = debounce(
		(e: React.ChangeEvent<HTMLInputElement>, type: 'minPrice' | 'maxPrice') => {
			const value = parseInt(e.target.value, 10)
			setSearchParams(prev => ({
				...prev,
				[type]: isNaN(value) ? undefined : value,
			}))
		},
		500
	)

	const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchParams(prev => ({ ...prev, search: e.target.value }))
	}, 300)

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

		if (searchParams.search) query.append('search', searchParams.search)
		replace(`${pathname}?${query.toString()}`)
	}, [searchParams])

	return (
		<div style={{ flexBasis: '300px' }}>
			<aside className={styles.sidebar}>
				<input
					type='text'
					placeholder='Find Game'
					onChange={handleSearch}
					className={styles.searchBar}
				/>
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
			</aside>
		</div>
	)
}
