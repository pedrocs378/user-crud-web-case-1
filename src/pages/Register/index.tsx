import { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import Loading from 'react-loading'
import * as Yup from 'yup'

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

import { api } from '../../services/api'

import { Container } from './styles'

interface ValidationErrors {
	[key: string]: string
}

export function Register() {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [cpf, setCpf] = useState('')
	const [password, setPassword] = useState('')
	const [password_confirmation, setPasswordConfirmation] = useState('')
	const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})
	const [isLoading, setIsLoading] = useState(false)

	const history = useHistory()

	async function handleSaveRegister(event: FormEvent) {
		event.preventDefault()

		try {
			setValidationErrors({})
			setIsLoading(true)

			const schema = Yup.object().shape({
				name: Yup.string().required('Nome obrigatório'),
				email: Yup.string().required('Email obrigatório').email('O email precisa ser válido'),
				cpf: Yup.string().required('CPF obrigatório').length(11, 'CPF inválido'),
				password: Yup.string().required('Senha obrigatória').min(6, 'A senha precisa ter no mínimo 6 caracteres'),
				password_confirmation: Yup.string()
					.oneOf([Yup.ref('password'), null], 'As senhas precisam ser iguais')
			})

			const data = {
				name,
				email,
				cpf,
				password,
				password_confirmation
			}

			await schema.validate(data, {
				abortEarly: false
			})

			await api.post('/users', data)

			toast.success('Cadastrado com sucesso!')
			history.goBack()
		} catch (err) {
			if (err instanceof Yup.ValidationError) {
				err.inner.forEach(error => {
					setValidationErrors(state => {
						return {
							...state,
							[error.path || '']: error.message
						}
					})

					toast.error(error.message)
				})

				return
			}

			toast.error('Algo deu errado. Tente novamente!')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Container>
			<form onSubmit={handleSaveRegister}>
				<h2>Cadastro</h2>

				<Input
					className="input"
					name="name"
					label="Nome"
					placeholder="Digite o seu nome"
					required
					value={name}
					onChange={event => setName(event.target.value)}
					error={!!validationErrors['name']}
				/>

				<Input
					className="input"
					name="email"
					label="E-mail"
					placeholder="youraddres@email.com"
					required
					value={email}
					onChange={event => setEmail(event.target.value)}
					error={!!validationErrors['email']}
				/>

				<Input
					className="input"
					name="cpf"
					label="CPF"
					type="number"
					placeholder="xxx.xxx.xxx-xx"
					required
					value={cpf}
					onChange={event => setCpf(event.target.value)}
					error={!!validationErrors['cpf']}
				/>

				<Input
					className="input"
					name="password"
					label="Senha"
					placeholder="********"
					required
					isPassword
					value={password}
					onChange={event => setPassword(event.target.value)}
					error={!!validationErrors['password']}
				/>

				<Input
					className="input"
					name="password_confirmation"
					label="Confirmar senha"
					placeholder="********"
					required
					isPassword
					value={password_confirmation}
					onChange={event => setPasswordConfirmation(event.target.value)}
					error={!!validationErrors['password_confirmation']}
				/>

				<Button type="submit">
					{isLoading ? (
						<Loading
							type="spinningBubbles"
							height={26}
							width={26}
						/>
					) : "Cadastrar"}
				</Button>

				<p>
					Já possui uma conta? <Link to="/">Entrar</Link>
				</p>
			</form>
		</Container>
	)
}