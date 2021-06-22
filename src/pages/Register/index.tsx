import { Link } from 'react-router-dom'

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

import { Container } from './styles'

export function Register() {

	return (
		<Container>
			<form>
				<h2>Cadastro</h2>

				<Input
					name="email"
					label="E-mail"
					placeholder="Youraddres@email.com"
				/>

				<Input
					name="password"
					label="Senha"
					placeholder="Enter your password"
					isPassword
				/>

				<Input
					name="password_confirmation"
					label="Confirmar senha"
					placeholder="Enter your password confirmation"
					isPassword
				/>

				<Button type="submit">Cadastrar</Button>

				<p>
					Já possui uma conta? <Link to="/">Entrar</Link>
				</p>
			</form>
		</Container>
	)
}