import { FormEvent, useState } from 'react'
import Loading from 'react-loading'
import { toast } from 'react-hot-toast'
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
	const [password, setPassword] = useState('')
	const [old_password, setOldPassword] = useState('')
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
					email: Yup.string().required('Email obrigatório').email('O email precisa ser válido'),
					old_password: Yup.string(),
					password: Yup.string().when('old_password', {
						is: (val: string) => !!val.length,
						then: Yup.string().required('Insira a nova senha'),
						otherwise: Yup.string()
					})
				})

				const data = {
					name,
					email,
					old_password,
					password
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
						name="old_password"
						label="Senha atual"
						placeholder="********"
						isPassword
						value={old_password}
						onChange={event => setOldPassword(event.target.value)}
					/>

					<Input
						className="input"
						name="password"
						label="Nova senha"
						placeholder="********"
						isPassword
						value={password}
						onChange={event => setPassword(event.target.value)}
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