import { useState } from 'react'
import { MdDashboard } from 'react-icons/md'

import { Logo } from '../../components/Logo'
import { Header } from '../../components/Header'
import { EditUserModal } from '../../components/EditUserModal'
import { Footer } from '../../components/Footer'

import { useAuth } from '../../hooks/useAuth'

import developerActivityImg from '../../assets/developer-activity.svg'

import { Container, Navigation, UserWelcome } from './styles'


export function Dashboard() {
	const [isEditModalOpen, setIsEditModalOpen] = useState(false)

	const { user } = useAuth()

	return (
		<Container>
			<EditUserModal
				user={undefined}
				isOpen={isEditModalOpen}
				onRequestClose={() => setIsEditModalOpen(false)}
			/>

			<aside>
				<Logo />

				<Navigation>
					<p>{user?.email}</p>

					<ul>
						<li>
							<button
								type="button"
								onClick={() => setIsEditModalOpen(true)}
							>
								<MdDashboard />
								Editar perfil
							</button>
						</li>
					</ul>
				</Navigation>
			</aside>

			<Header />

			<main>
				<div />

				<UserWelcome>
					<strong>
						Bem vindo,<br />
						<span>{user?.name}</span>
					</strong>

					<img
						src={developerActivityImg}
						alt="Desenvolvedor programando"
					/>
				</UserWelcome>
			</main>

			<Footer />
		</Container>
	)
}