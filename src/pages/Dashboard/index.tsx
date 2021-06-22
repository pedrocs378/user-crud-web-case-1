import { Link } from 'react-router-dom'
import { MdDashboard, MdShoppingCart } from 'react-icons/md'
import { GrMail } from 'react-icons/gr'
import { GiBrickWall } from 'react-icons/gi'
import { IoSearchOutline } from 'react-icons/io5'

import { Container, Navigation } from './styles'

export function Dashboard() {

	return (
		<Container>
			<aside>
				<div className="logo">
					<h1>Mind Education</h1>
				</div>

				<Navigation>
					<strong>Navegação</strong>

					<ul>
						<li>
							<Link to="/dashboard">
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

			<header>
				<label htmlFor="search">
					<IoSearchOutline />
					<input
						type="text"
						id="search"
						name="search"
						placeholder="Search..."
					/>
				</label>

				<button type="button">
					Logout
				</button>
			</header>

			<main></main>

			<footer>
				<strong>
					Copyrights © <span>Mind Education</span>
				</strong>
			</footer>
		</Container>
	)
}