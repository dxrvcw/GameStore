'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import styles from './LinkComponent.module.css'

interface ILinkProps {
	href: string
	children: ReactNode
	onClick?: () => void
}

export function LinkComponent({ children, href, onClick }: ILinkProps) {
	const pathname = usePathname()

	return (
		<Link
			href={href}
			className={
				pathname === href ? styles.link + ' ' + styles.active : styles.link
			}
			onClick={onClick}
		>
			{children}
		</Link>
	)
}
