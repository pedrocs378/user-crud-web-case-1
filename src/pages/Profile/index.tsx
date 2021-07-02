import { FormEvent, useState } from 'react'
import Loading from 'react-loading'
import { toast } from 'react-hot-toast'
import { validateCPF } from 'validations-br'
import * as Yup from 'yup'

import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

import { useAuth } from '../../hooks/useAuth'

import { getValidationErrors } from '../../utils/getValidationErrors'
import { api } from '../../services/api'

import { Container } from './styles'

interface ValidationErrors {
	[key: string]: string
}

export function Profile() {
	const { user, updateUserData } = useAuth()

	const [name, setName] = useState(user?.name ?? '')
	const [email, setEmail] = useState(user?.email ?? '')
	const [cpf, setCpf] = useState(user?.cpf ?? '')
	const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})
	const [isLoading, setIsLoading] = useState(false)

	async function handleUpdateUser(event: FormEvent) {
		event.preventDefault()

		try {
			if (user) {
				setIsLoading(true)
				setValidationErrors({})

				const schema = Yup.object().shape({
					name: Yup.string().required('Nome obrigatório').min(3, 'Nome muito curto'),
					cpf: Yup
						.string()
						.required('CPF obrigatório')
						.test('isCpf', 'CPF inválido', value => validateCPF(String(value))),
					email: Yup.string().required('Email obrigatório').email('O email precisa ser válido'),
				})

				const data = {
					name,
					cpf,
					email
				}

				await schema.validate(data, {
					abortEarly: false
				})

				const response = await api.put(`/profile`, data)

				updateUserData(response.data)

				toast.success(`Perfil atualizado!`)
			}
		} catch (err) {
			if (err instanceof Yup.ValidationError) {
				const errors = getValidationErrors(err)

				setValidationErrors(errors)

				return
			}

			toast.error('Não foi possivel editar seu perfil')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<>
			<Header title="Perfil" />

			<Container>
				<form onSubmit={handleUpdateUser}>
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
						error={!!validationErrors['cpf']}
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