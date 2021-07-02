import { useState } from 'react'
import Loading from 'react-loading'

import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

import { useAuth } from '../../hooks/useAuth'

import { Container } from './styles'

interface ValidationErrors {
	[key: string]: string
}

export function Profile() {
	const { user } = useAuth()

	const [name, setName] = useState(user?.name ?? '')
	const [email, setEmail] = useState(user?.email ?? '')
	const [cpf, setCpf] = useState(user?.cpf ?? '')
	const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})
	const [isLoading, setIsLoading] = useState(false)
	return (
		<>
			<Header title="Perfil" />

			<Container>
				<form>
					<h2>Editar perfil</h2>

					<Input
						className="input"
						name="name"
						label="Nome"
						placeholder="Digite seu nome"
						required
						value={name}
						onChange={event => setName(event.target.value)}
						error={!!validationErrors['name']}
					/>
					<Input
						className="input"
						name="cpf"
						label="CPF"
						placeholder="xxx.xxx.xxx-xx"
						required
						value={cpf}
						onChange={event => setCpf(event.target.value)}
						error={!!validationErrors['name']}
					/>
					<Input
						className="input"
						name="email"
						type="email"
						label="E-mail"
						placeholder="youraddres@email.com"
						required
						value={email}
						onChange={event => setEmail(event.target.value)}
						error={!!validationErrors['email']}
					/>
					<Input
						className="input"
						name="password"
						label="Senha"
						placeholder="********"
						isPassword
					/>
					<Input
						className="input"
						name="password_confirmation"
						label="Confirme sua senha"
						placeholder="********"
						isPassword
					/>

					<Button type="submit">
						{isLoading ? (
							<Loading
								type="spinningBubbles"
								height={26}
								width={26}
							/>
						) : "Confirmar"}
					</Button>
				</form>
			</Container>
		</>
	)
}