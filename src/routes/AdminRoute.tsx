import { Redirect, Route, RouteProps } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

type AdminRouteProps = RouteProps & {
	component: React.ComponentType
}

export function AdminRoute({ component: Component, ...rest }: AdminRouteProps) {
	const { user } = useAuth()

	return (
		<Route
			{...rest}
			render={routeProps => {
				return (!!user && user.isAdmin) ? (
					<Component {...routeProps} />
				) : (
					<Redirect
						to={{
							pathname: '/',
							state: { from: routeProps.location }
						}}
					/>
				)
			}}
		/>
	)
}