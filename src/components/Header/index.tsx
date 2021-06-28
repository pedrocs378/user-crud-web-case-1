import { ReactNode } from 'react'
import { useHistory } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'

import { Container } from './styles'

interface HeaderProps {
	children?: ReactNode
}

export function Header({ children }: HeaderProps) {
	const { signOut } = useAuth()
	const history = useHistory()

	function handleLogout() {
		signOut()

		history.push('/')
	}

	return (
		<Container>
			{children}
			<button type="button" onClick={handleLogout}>
				Logout
			</button>
		</Container>
	)
}