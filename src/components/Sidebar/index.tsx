import { CgProfile } from 'react-icons/cg'
import { FiUsers } from 'react-icons/fi'
import { RiDashboardLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

import { Logo } from '../Logo'

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
					{user?.isAdmin && (
						<>
							<li>
								<Link to="/dashboard">
									<RiDashboardLine />
									Dashboard
								</Link>
							</li>
							<li>
								<Link to="/users">
									<FiUsers />
									Usuários
								</Link>
							</li>
						</>
					)}
					<li>
						<Link to="/profile">
							<CgProfile />
							Meu perfil
						</Link>
					</li>
				</ul>
			</Navigation>
		</Container>
	)
}