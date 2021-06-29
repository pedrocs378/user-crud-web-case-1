import { useState, useEffect, useCallback, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { MdDashboard, MdShoppingCart } from 'react-icons/md'
import { GrMail } from 'react-icons/gr'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { GiBrickWall } from 'react-icons/gi'
import { GoTools } from 'react-icons/go'
import { IoSearchOutline } from 'react-icons/io5'
import Loading from 'react-loading'
import IconButton from '@material-ui/core/IconButton';

import { Logo } from '../../components/Logo'
import { Header } from '../../components/Header'
import { EditUserModal } from '../../components/EditUserModal'
import { DeleteUserModal } from '../../components/DeleteUserModal'
import { Footer } from '../../components/Footer'

import { api } from '../../services/api'
import { parseUsers } from '../../utils/parseUsers'

import { Container, Navigation } from './styles'

interface User {
	id: string
	name: string
	email: string
	created_at: string
	createdAtFormatted: string
}

export function DashboardAdmin() {
	const [users, setUsers] = useState<User[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [userToBeUpdated, setUserToBeUpdated] = useState<User | undefined>()
	const [isEditModalOpen, setIsEditModalOpen] = useState(false)

	const [userIdToBeDeleted, setUserIdToBeDeleted] = useState('')
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

	async function fetchUsers() {
		const response = await api.get<User[]>('/users')
		const parsedUsers = parseUsers(response.data)
		setUsers(parsedUsers)
	}

	async function handleCloseUpdateModal() {
		setIsEditModalOpen(false)

		await fetchUsers()
	}

	async function handleCloseDeleteModal() {
		setIsDeleteModalOpen(false)

		await fetchUsers()
	}

	const handleOpenUpdateModal = useCallback((user: User) => {
		setUserToBeUpdated(user)
		setIsEditModalOpen(true)
	}, [])

	const handleOpenDeleteModal = useCallback((id: string) => {
		setUserIdToBeDeleted(id)
		setIsDeleteModalOpen(true)
	}, [])

	useEffect(() => {
		setIsLoading(true)

		fetchUsers().finally(() => setIsLoading(false))
	}, [])

	return (
		<Container>
			<EditUserModal
				isOpen={isEditModalOpen}
				user={userToBeUpdated}
				onRequestClose={handleCloseUpdateModal}
			/>

			<DeleteUserModal
				isOpen={isDeleteModalOpen}
				userId={userIdToBeDeleted}
				onRequestClose={handleCloseDeleteModal}
			/>

			<aside>
				<Logo />

				<Navigation>
					<strong>Navegação</strong>

					<ul>
						<li>
							<Link to="/dashboard/admin">
								<MdDashboard />
								Dashboard
							</Link>
						</li>
						<li>
							<Link to="#">
								<GiBrickWall />
								Função 2
							</Link>
						</li>
						<li>
							<Link to="#">
								<GrMail />
								Função 3
							</Link>
						</li>
						<li>
							<Link to="#">
								<MdShoppingCart />
								Função 4
							</Link>
						</li>
					</ul>
				</Navigation>
			</aside>

			<Header>
				<label htmlFor="search">
					<IoSearchOutline />
					<input
						type="text"
						id="search"
						name="search"
						placeholder="Search..."
					/>
				</label>
			</Header>

			<main>
				<div>
					<h2>Cadastros</h2>
					{isLoading && (
						<Loading
							type="bubbles"
							color="var(--purple)"
							height={24}
							width={24}
						/>
					)}
				</div>

				<section>
					<table>
						<thead>
							<tr>
								<th>#</th>
								<th>Nome</th>
								<th>E-mail</th>
								<th>Data de cadastro</th>
								<th></th>
								<th></th>
							</tr>
						</thead>

						<tbody>
							{users.map((user, index) => {
								return (
									<Fragment key={user.id}>
										<tr>
											<td>{index + 1}</td>
											<td>{user.name}</td>
											<td>{user.email}</td>
											<td>{user.createdAtFormatted}</td>
											<td className="button">
												<IconButton onClick={() => handleOpenUpdateModal(user)}>
													<GoTools />
												</IconButton>
											</td>
											<td className="button">
												<IconButton onClick={() => handleOpenDeleteModal(user.id)}>
													<AiOutlineCloseCircle />
												</IconButton>
											</td>
										</tr>
										<tr className="spacing" />
									</Fragment>
								)
							})}
						</tbody>
					</table>
				</section>
			</main>

			<Footer />
		</Container>
	)
}