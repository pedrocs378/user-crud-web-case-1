import { Link } from 'react-router-dom'

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

import { Container } from './styles'

export function ForgotPassword() {

	return (
		<Container>
			<form>
				<h2>Esqueci minha senha</h2>

				<Input
					name="email"
					label="Insira seu e-mail"
					placeholder="Youraddres@email.com"
				/>

				<Button type="submit">Enviar Código</Button>

				<p>
					Já possui uma conta? <Link to="/">Entrar</Link>
				</p>
			</form>
		</Container>
	)
}