import { useState, useEffect, useCallback, Fragment, FormEvent } from 'react'
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

import { Container, Navigation, MainHeader } from './styles'
import toast from 'react-hot-toast'

interface User {
	id: string
	name: string
	email: string
	isAdmin: boolean
	created_at: string
	createdAtFormatted: string
}

export function DashboardAdmin() {
	const [users, setUsers] = useState<User[]>([])
	const [searchedUsers, setSearchedUsers] = useState<User[]>([])
	const [searchText, setSearchText] = useState('')
	const [isSearchLoading, setIsSearchLoading] = useState(false)
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

	async function handleSearchUsers(event: FormEvent) {
		event.preventDefault()

		if (!searchText.trim()) {
			return
		}

		try {
			setIsLoading(true)
			setIsSearchLoading(true)

			const response = await api.get<User[]>(`/users/search?name=${searchText}`)
			const parsedUsers = parseUsers(response.data)
			setSearchedUsers(parsedUsers)
		} catch {
			setSearchedUsers([])
			toast.error('Nenhum usuário encontrado', {
				position: 'top-right'
			})
		} finally {
			setIsLoading(false)
			setIsSearchLoading(false)
		}

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
		<Container id="dashboard-admin">
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
				<form onSubmit={handleSearchUsers}>
					<label htmlFor="search">
						<IoSearchOutline />
						<input
							type="text"
							id="search"
							name="search"
							placeholder="Pesquisar..."
							value={searchText}
							onChange={event => setSearchText(event.target.value)}
						/>
					</label>

					<button type="submit">
						{isSearchLoading ? (
							<Loading
								type="spinningBubbles"
								color="var(--white)"
								height={24}
								width={24}
							/>
						) : (
							<IoSearchOutline />
						)}
					</button>
				</form>
			</Header>

			<main>
				<MainHeader>
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
				</MainHeader>

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
							{searchedUsers.length > 0
								? searchedUsers.map((user, index) => {
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
								})
								: users.map((user, index) => {
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