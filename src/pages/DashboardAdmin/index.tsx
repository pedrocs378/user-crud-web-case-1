import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdDashboard, MdShoppingCart } from 'react-icons/md'
import { GrMail } from 'react-icons/gr'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { GiBrickWall } from 'react-icons/gi'
import { GoTools } from 'react-icons/go'
import { IoSearchOutline } from 'react-icons/io5'
import IconButton from '@material-ui/core/IconButton';

import { Logo } from '../../components/Logo'
import { Header } from '../../components/Header'
import { EditUserModal } from '../../components/EditUserModal'
import { DeleteUserModal } from '../../components/DeleteUserModal'
import { Footer } from '../../components/Footer'

import { Container, Navigation } from './styles'

export function DashboardAdmin() {
	const [isEditModalOpen, setIsEditModalOpen] = useState(false)
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

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
							<tr>
								<td>01</td>
								<td>Bitcoin</td>
								<td>exemplo@exemplo.com</td>
								<td>23/06/2021</td>
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
							<tr>
								<td>02</td>
								<td>Bitcoin</td>
								<td>exemplo@exemplo.com</td>
								<td>23/06/2021</td>
								<td className="button">
									<IconButton>
										<GoTools />
									</IconButton>
								</td>
								<td className="button">
									<IconButton>
										<AiOutlineCloseCircle />
									</IconButton>
								</td>
							</tr>
							<tr className="spacing" />
						</tbody>
					</table>
				</section>
			</main>

			<Footer />
		</Container>
	)
}