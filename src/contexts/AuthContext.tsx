import { createContext, ReactNode, useState } from "react";
import { useCookies } from 'react-cookie'

import { api } from "../services/api";

interface User {
	id: string
	name: string
	email: string
	isAdmin: boolean
}

interface SignInCredentials {
	email: string
	password: string
}

interface AuthContextData {
	user: User | undefined
	signIn: (credentials: SignInCredentials) => Promise<User>
	signOut: () => void
}

interface AuthProviderProps {
	children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
	const [cookies, setCookie, removeCookie] = useCookies()
	const [user, setUser] = useState<User | undefined>(() => {
		const {
			'@Mindeducation:user': user,
			'@Mindeducation:token': token
		} = cookies

		if (user && token) {
			api.defaults.headers.authorization = `Bearer ${token}`

			return user
		}

		return undefined
	})

	async function signIn({ email, password }: SignInCredentials) {
		const response = await api.post('/sessions', {
			email,
			password
		})

		api.defaults.headers.authorization = `Bearer ${response.data.token}`

		setUser(response.data.user)
		setCookie('@Mindeducation:user', response.data.user)
		setCookie('@Mindeducation:token', response.data.token)

		return response.data.user
	}

	function signOut() {
		removeCookie('@Mindeducation:user')
		removeCookie('@Mindeducation:token')
		setUser(undefined)
	}

	return (
		<AuthContext.Provider value={{ user, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	)
}