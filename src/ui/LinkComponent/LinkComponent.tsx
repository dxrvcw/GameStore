'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import styles from './LinkComponent.module.css'

interface ILinkProps {
	href: string
	children: ReactNode
}

export function LinkComponent({ children, href }: ILinkProps) {
	const pathname = usePathname()

	return (
		<Link
			href={href}
			className={
				pathname === href ? styles.link + ' ' + styles.active : styles.link
			}
		>
			{children}
		</Link>
	)
}
