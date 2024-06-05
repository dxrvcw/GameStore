import { LinkComponent } from '@/ui/LinkComponent/LinkComponent'
import styles from './HeaderNav.module.css'

const links = [
	{ href: '/', name: 'Home' },
	{ href: '/streams', name: 'Streams' },
	{ href: '/game-store', name: 'Game Store' },
	{ href: '/news', name: 'News' },
]

export function HeaderNav() {
	return (
		<nav>
			<ul className={styles.list}>
				{links.map(link => (
					<li key={link.name}>
						<LinkComponent href={link.href}>{link.name}</LinkComponent>
					</li>
				))}
			</ul>
		</nav>
	)
}
