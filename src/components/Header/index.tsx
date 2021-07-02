import { ReactNode } from 'react'
import { useHistory } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'

import { Container, Content, Title } from './styles'

interface HeaderProps {
	children?: ReactNode
	title?: string
}

export function Header({ title = '', children }: HeaderProps) {
	const { signOut } = useAuth()
	const history = useHistory()

	function handleLogout() {
		signOut()

		history.push('/')
	}

	return (
		<Container>
			<Content>
				{children}
				<button type="button" onClick={handleLogout}>
					Logout
				</button>
			</Content>
			<Title>
				<div>
					<h2>{title}</h2>
				</div>
			</Title>
		</Container>
	)
}