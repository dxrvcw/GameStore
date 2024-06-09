'use client'

import {
	useBoundStore,
	useInitializeCart,
	useInitializeFavorites,
} from '@/store/store'
import { LinkComponent } from '@/ui/LinkComponent/LinkComponent'
import { signOut, useSession } from 'next-auth/react'
import { CgProfile } from 'react-icons/cg'
import {
	FaHeart,
	FaShoppingCart,
	FaSignInAlt,
	FaSignOutAlt,
} from 'react-icons/fa'
import styles from './HeaderMenu.module.css'

export function HeaderMenu() {
	useInitializeFavorites()
	useInitializeCart()

	const favorites = useBoundStore(state => state.favorites)
	const cart = useBoundStore(state => state.cart)

	const session = useSession()

	return (
		<nav className={styles.menu}>
			<LinkComponent href='/favorites'>
				<FaHeart className='icon' />

				{!!favorites.length && (
					<p className={styles.favCount}>{favorites.length}</p>
				)}
			</LinkComponent>
			<LinkComponent href='/cart'>
				<FaShoppingCart className='icon' />
				{!!cart.length && <p className={styles.favCount}>{cart.length}</p>}
			</LinkComponent>
			{session?.data ? (
				<>
					<LinkComponent href='/profile'>
						<CgProfile className='icon' />
					</LinkComponent>
					<LinkComponent href='#' onClick={() => signOut({ callbackUrl: '/' })}>
						<FaSignOutAlt className='icon' />
					</LinkComponent>
				</>
			) : (
				<LinkComponent href='/api/auth/signin'>
					<FaSignInAlt className='icon' />
				</LinkComponent>
			)}
		</nav>
	)
}
