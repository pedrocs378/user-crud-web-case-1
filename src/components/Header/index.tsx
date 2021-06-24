import { ReactNode } from 'react'

import { Container } from './styles'

interface HeaderProps {
	children?: ReactNode
}

export function Header({ children }: HeaderProps) {

	return (
		<Container>
			{children}
			<button type="button">
				Logout
			</button>
		</Container>
	)
}