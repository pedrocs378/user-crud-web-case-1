import { createContext, ReactNode, useState, useCallback } from "react";
import { useCookies } from 'react-cookie'
import { AxiosResponse } from 'axios'

import { api } from "../services/api";

interface User {
	id: string
	name: string
	email: string
	cpf: string
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
	updateUserData: (data: User) => void
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

	const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
		const response = await api.post('/sessions', {
			email,
			password
		})

		api.defaults.headers.authorization = `Bearer ${response.data.token}`

		setUser(response.data.user)
		setCookie('@Mindeducation:user', response.data.user)
		setCookie('@Mindeducation:token', response.data.token)

		return response.data.user
	}, [setCookie])

	const signOut = useCallback(() => {
		removeCookie('@Mindeducation:user')
		removeCookie('@Mindeducation:token')
		setUser(undefined)
	}, [removeCookie])

	const updateUserData = useCallback((data: User) => {
		setUser(data)
		setCookie('@Mindeducation:user', data)
	}, [setCookie])

	return (
		<AuthContext.Provider value={{ user, signIn, signOut, updateUserData }}>
			{children}
		</AuthContext.Provider>
	)
}