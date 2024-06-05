import { Header } from '@/ui/Header/Header'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: {
		template: 'Game Store | %s',
		default: 'Game Store',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={inter.className + ' container'}>
				<Header />
				{children}
			</body>
		</html>
	)
}
