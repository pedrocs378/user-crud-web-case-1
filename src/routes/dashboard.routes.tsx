import { Sidebar } from '../components/Sidebar'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

import { UsersList } from '../pages/UsersList'
import { Profile } from '../pages/Profile'
import { Dashboard } from '../pages/Dashboard'

import { AdminRoute } from './AdminRoute'
import { PrivateRoute } from './PrivateRoute'

import { Container } from '../styles/dashboard'

export function DashboardRoutes() {

	return (
		<Container>
			<Sidebar />

			<PrivateRoute path="/dashboard" exact component={Dashboard} />
			<PrivateRoute path="/profile" component={Profile} />

			<AdminRoute
				path="/dashboard/admin"
				component={() => <Header title="Dashboard" />}
			/>
			<AdminRoute path="/users" component={UsersList} />


			<Footer />
		</Container>
	)
}