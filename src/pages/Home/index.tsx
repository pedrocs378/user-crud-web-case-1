import { Link } from 'react-router-dom'
import { StylesProvider } from '@material-ui/core/styles';

import { Button } from '../../components/Button'

import { Container, Input } from './styles'

export function Home() {

	return (
		<StylesProvider injectFirst>
			<Container>
				<form>
					<h2>Entrar</h2>

					<p className="subtitle">
						O seu passaporte para o futuro.
					</p>

					<Input
						label="E-mail"
						placeholder="Youraddres@email.com"
					/>
					<Input
						label="Senha"
						placeholder="Enter your password"
					/>

					<Button type="button">Login</Button>

					<p className="register">
						Não possui uma conta? <Link to="register">Registrar-se</Link>
					</p>
				</form>
			</Container>
		</StylesProvider>
	)
}