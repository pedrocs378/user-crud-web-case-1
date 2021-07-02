import { Sidebar } from '../components/Sidebar'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

import { UsersList } from '../pages/UsersList'
import { Profile } from '../pages/Profile'

import { AdminRoute } from './AdminRoute'

import { Container } from '../styles/app'

export function DashboardRoutes() {

	return (
		<Container>
			<Sidebar />

			<AdminRoute path="/dashboard" component={() => <Header title="Dashboard" />} />
			<AdminRoute path="/users" component={UsersList} />
			<AdminRoute path="/profile" component={Profile} />

			<Footer />
		</Container>
	)
}