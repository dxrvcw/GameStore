import styles from './Header.module.css'
import { HeaderMenu } from './HeaderMenu/HeaderMenu'
import { HeaderNav } from './HeaderNav/HeaderNav'

export function Header() {
	return (
		<header className={styles.header}>
			<HeaderNav />
			<HeaderMenu />
		</header>
	)
}
