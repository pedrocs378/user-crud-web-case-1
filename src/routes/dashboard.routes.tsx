import { Redirect } from 'react-router-dom'

import { Sidebar } from '../components/Sidebar'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

import { UsersList } from '../pages/UsersList'
import { Profile } from '../pages/Profile'
import { Dashboard } from '../pages/Dashboard'

import { AdminRoute } from './AdminRoute'
import { PrivateRoute } from './PrivateRoute'

import { useAuth } from '../hooks/useAuth'

import { Container } from '../styles/dashboard'

export function DashboardRoutes() {
	const { user } = useAuth()

	return (
		<Container>
			<Sidebar />

			<PrivateRoute path="/dashboard" exact component={Dashboard}>
				{user?.isAdmin && <Redirect to="/dashboard/admin" />}
			</PrivateRoute>

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