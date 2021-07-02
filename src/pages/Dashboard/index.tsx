import { useState } from 'react'

import { Header } from '../../components/Header'
import { EditUserModal } from '../../components/EditUserModal'
import { Footer } from '../../components/Footer'

import { useAuth } from '../../hooks/useAuth'

import developerActivityImg from '../../assets/developer-activity.svg'

import { Container, UserWelcome } from './styles'

export function Dashboard() {
	const [isEditModalOpen, setIsEditModalOpen] = useState(false)

	const { user, updateUserData } = useAuth()

	return (
		<>
			<EditUserModal
				user={user}
				isOpen={isEditModalOpen}
				onRequestClose={() => setIsEditModalOpen(false)}
				onSuccessUpdate={updateUserData}
			/>

			<Header title="Dashboard" />

			<Container>
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
			</Container>

			<Footer />
		</>
	)
}