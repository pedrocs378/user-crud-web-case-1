import { LinkProps, useRouteMatch } from 'react-router-dom'

import { Container } from './styles'

type ActiveLinkProps = LinkProps

export function ActiveLink({ children, ...rest }: ActiveLinkProps) {

	const match = useRouteMatch(`${rest.to}`)

	return (
		<Container
			{...rest}
			isActive={!!match?.isExact}
		>
			{children}
		</Container>
	)
}