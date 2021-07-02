import { useState, useEffect, useCallback, Fragment, FormEvent } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { GoTools } from 'react-icons/go'
import { IoSearchOutline } from 'react-icons/io5'
import Loading from 'react-loading'
import IconButton from '@material-ui/core/IconButton';
import toast from 'react-hot-toast'

import { Header } from '../../components/Header'
import { EditUserModal } from '../../components/EditUserModal'
import { DeleteUserModal } from '../../components/DeleteUserModal'
import { Load } from '../../components/Load'

import { api } from '../../services/api'
import { parseUsers } from '../../utils/parseUsers'

import { Container } from './styles'

interface User {
	id: string
	name: string
	email: string
	cpf: string
	isAdmin: boolean
	created_at: string
	createdAtFormatted: string
}

export function UsersList() {
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
		<>
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

			<Header title="Usuários">
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

			<Container id="dashboard-admin">
				<section>
					{isLoading || isSearchLoading ? (
						<Load />
					) : (
						<table>
							<thead>
								<tr>
									<th>#</th>
									<th>Nome</th>
									<th>CPF</th>
									<th>E-mail</th>
									<th>Admin?</th>
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
													<td>{user.cpf}</td>
													<td>{user.email}</td>
													<td>{user.isAdmin ? "Sim" : "Não"}</td>
													<td className="button">
														<IconButton
															onClick={() => handleOpenUpdateModal(user)}
														>
															<GoTools />
														</IconButton>
													</td>
													<td className="button">
														<IconButton
															onClick={() => handleOpenDeleteModal(user.id)}
														>
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
													<td>{user.cpf}</td>
													<td>{user.email}</td>
													<td>{user.isAdmin ? "Sim" : "Não"}</td>
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
					)}
				</section>
			</Container>
		</>
	)
}