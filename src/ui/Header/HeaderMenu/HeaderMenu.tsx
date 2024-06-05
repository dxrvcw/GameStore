import { LinkComponent } from '@/ui/LinkComponent/LinkComponent'
import { FaHeart, FaShoppingCart, FaSignInAlt } from 'react-icons/fa'
import styles from './HeaderMenu.module.css'

export function HeaderMenu() {
	return (
		<nav className={styles.menu}>
			<LinkComponent href='/favorites'>
				<FaHeart className='icon' />
			</LinkComponent>
			<LinkComponent href='/cart'>
				<FaShoppingCart className='icon' />
			</LinkComponent>
			<LinkComponent href='/sign-in'>
				<FaSignInAlt className='icon' />
			</LinkComponent>
		</nav>
	)
}
