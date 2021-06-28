import { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { MdDashboard, MdShoppingCart } from 'react-icons/md'
import { GrMail } from 'react-icons/gr'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { GiBrickWall } from 'react-icons/gi'
import { GoTools } from 'react-icons/go'
import { IoSearchOutline } from 'react-icons/io5'
import Loading from 'react-loading'
import IconButton from '@material-ui/core/IconButton';
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { Logo } from '../../components/Logo'
import { Header } from '../../components/Header'
import { EditUserModal } from '../../components/EditUserModal'
import { DeleteUserModal } from '../../components/DeleteUserModal'
import { Footer } from '../../components/Footer'

import { api } from '../../services/api'

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
	const [isEditModalOpen, setIsEditModalOpen] = useState(false)
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

	useEffect(() => {
		setIsLoading(true)

		api.get<User[]>('/users')
			.then(response => {
				const parsedUsers = response.data.map(user => {
					return {
						...user,
						createdAtFormatted: format(new Date(user.created_at), 'dd/MM/yyyy', {
							locale: ptBR
						})
					}
				})

				setUsers(parsedUsers)
			})
			.finally(() => setIsLoading(false))
	}, [])

	return (
		<Container>
			<EditUserModal
				isOpen={isEditModalOpen}
				onRequestClose={() => setIsEditModalOpen(false)}
			/>

			<DeleteUserModal
				isOpen={isDeleteModalOpen}
				onRequestClose={() => setIsDeleteModalOpen(false)}
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
												<IconButton onClick={() => setIsEditModalOpen(true)}>
													<GoTools />
												</IconButton>
											</td>
											<td className="button">
												<IconButton onClick={() => setIsDeleteModalOpen(true)}>
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