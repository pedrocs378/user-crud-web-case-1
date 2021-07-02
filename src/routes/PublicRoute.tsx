import { Redirect, Route, RouteProps } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

type PublicRouteProps = RouteProps & {
	component: React.ComponentType
}

export function PublicRoute({ component: Component, ...rest }: PublicRouteProps) {
	const { user } = useAuth()

	return (
		<Route
			{...rest}
			render={routeProps => {
				return !user ? (
					<Component {...routeProps} />
				) : user.isAdmin && (
					<Redirect
						to={{
							pathname: '/dashboard',
							state: { from: routeProps.location }
						}}
					/>
				)
			}}
		/>
	)
}