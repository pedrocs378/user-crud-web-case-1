import { CgProfile } from 'react-icons/cg'
import { FiUsers } from 'react-icons/fi'
import { RiDashboardLine } from 'react-icons/ri'

import { Logo } from '../Logo'
import { ActiveLink } from './ActiveLink'

import { useAuth } from '../../hooks/useAuth'

import { Container, Navigation } from './styles'

export function Sidebar() {
	const { user } = useAuth()

	return (
		<Container>
			<Logo />

			<Navigation>
				{user?.isAdmin ? (
					<strong>Navegação</strong>
				) : (
					<p>{user?.email}</p>
				)}

				<ul>
					<li>
						<ActiveLink to="/dashboard">
							<RiDashboardLine />
							Dashboard
						</ActiveLink>
					</li>
					<li>
						<ActiveLink to="/users">
							<FiUsers />
							Usuários
						</ActiveLink>
					</li>
					<li>
						<ActiveLink to="/profile">
							<CgProfile />
							Meu perfil
						</ActiveLink>
					</li>
				</ul>
			</Navigation>
		</Container>
	)
}