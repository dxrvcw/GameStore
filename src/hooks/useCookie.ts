'use client'

import Cookies from 'js-cookie'
import { useCallback, useState } from 'react'

export default function useCookie(name: string, initialValue: any) {
	const [cookie, setCookie] = useState(() => {
		const storedCookie = Cookies.get(name)
		if (storedCookie) return storedCookie

		Cookies.set(name, initialValue)
		return initialValue
	})

	const updateCookie = useCallback(
		(newValue: string, options?: any) => {
			Cookies.set(name, newValue, options)
			setCookie(newValue)
		},
		[name]
	)

	const deleteCookie = useCallback(() => {
		Cookies.remove(name)
		setCookie(null)
	}, [name])

	return [cookie, updateCookie, deleteCookie]
}
