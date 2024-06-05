import { StoreSideBar } from '@/ui/StoreSideBar/StoreSideBar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Store',
}

export default function GameStoreLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<main style={{ display: 'flex', gap: 30 }}>
			<StoreSideBar />
			{children}
		</main>
	)
}
