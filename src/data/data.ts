import { sql } from '@vercel/postgres'

export interface IGameData {
	id: string
	name: string
	price: number
	category: string
	platform: string
	image_url: string
}

export async function fetchCategories() {
	try {
		const data = await sql`
			SELECT DISTINCT category from games;
		`

		return data.rows.map(row => row.category)
	} catch (error) {
		console.error('Database Error:', error)
		throw new Error('Failed to fetch categories data.')
	}
}
export async function fetchPlatforms() {
	try {
		const data = await sql`
			SELECT DISTINCT platform from games;
		`

		return data.rows.map(row => row.platform)
	} catch (error) {
		console.error('Database Error:', error)
		throw new Error('Failed to fetch platforms data.')
	}
}

export async function fetchGames(searchParams?: any): Promise<IGameData[]> {
	try {
		if (!searchParams) {
			let data = await sql`SELECT * FROM GAMES`
			return data.rows as IGameData[]
		}

		const { categories, platforms, minPrice, maxPrice, search } = searchParams

		let data = await sql`SELECT * FROM GAMES`

		const categoryList = categories
			? Array.isArray(categories)
				? categories
				: [categories]
			: null

		const platformList = platforms
			? Array.isArray(platforms)
				? platforms
				: [platforms]
			: null

		if (categoryList) {
			data.rows = data.rows.filter(row => categoryList.includes(row.category))
		}
		if (platformList) {
			data.rows = data.rows.filter(row => platformList.includes(row.platform))
		}
		if (minPrice) {
			data.rows = data.rows.filter(row => row.price >= minPrice)
		}
		if (maxPrice) {
			data.rows = data.rows.filter(row => row.price <= maxPrice)
		}
		if (search) {
			data.rows = data.rows.filter(row =>
				row.name.toLowerCase().includes(search.toLowerCase())
			)
		}

		return data.rows as IGameData[]
	} catch (error) {
		console.error('Database Error:', error)
		throw new Error('Failed to fetch games data.')
	}
}
