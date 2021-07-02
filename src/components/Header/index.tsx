import { ReactNode } from 'react'

import { useAuth } from '../../hooks/useAuth'

import { Container, Content, Title } from './styles'

interface HeaderProps {
	children?: ReactNode
	title?: string
}

export function Header({ title = '', children }: HeaderProps) {
	const { signOut } = useAuth()

	return (
		<Container>
			<Content>
				{children}
				<button type="button" onClick={signOut}>
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