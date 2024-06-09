import { fetchCategories, fetchPlatforms } from '@/data/data'
import { StoreSideBar } from '@/ui/StoreSideBar/StoreSideBar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Store',
}

export default async function GameStoreLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const categories = await fetchCategories()
	const platforms = await fetchPlatforms()

	return (
		<main style={{ display: 'flex', gap: 30 }}>
			<StoreSideBar categories={categories} platforms={platforms} />
			{children}
		</main>
	)
}
