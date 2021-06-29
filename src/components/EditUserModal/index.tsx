import { useState, useEffect, FormEvent } from 'react'
import Modal, { Props as ModalProps } from 'react-modal'
import { toast } from 'react-hot-toast'
import Loading from 'react-loading'

import { Input } from '../Input'
import { Button } from '../Button'

import { api } from '../../services/api'

import { Container } from './styles'

interface User {
	id: string
	name: string
	email: string
	created_at: string
	createdAtFormatted: string
}

interface EditUserModalProps extends ModalProps {
	isOpen: boolean
	user: User | undefined
	onRequestClose: () => void
}

export function EditUserModal({ isOpen, user, onRequestClose }: EditUserModalProps) {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	async function handleUpdateUser(event: FormEvent) {
		event.preventDefault()
		setIsLoading(true)

		try {
			if (user) {
				const response = await api.put(`/users/${user.id}`, {
					name,
					email
				})

				onRequestClose()
				toast.success(`${response.data.name} foi atualizado`)
			}
		} catch {
			toast.error('Não foi possivel editar o usuário')
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		if (user) {
			setName(user.name)
			setEmail(user.email)
		}
	}, [user])

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			className="react-modal-content"
			overlayClassName="react-modal-overlay"
		>
			<Container onSubmit={handleUpdateUser}>
				<h2>Editar</h2>

				<Input
					className="input"
					name="name"
					label="Nome"
					placeholder="Digite seu nome"
					value={name}
					onChange={event => setName(event.target.value)}
				/>
				<Input
					className="input"
					name="email"
					label="E-mail"
					placeholder="youraddres@email.com"
					value={email}
					onChange={event => setEmail(event.target.value)}
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

				<button type="button" onClick={onRequestClose}>
					Voltar
				</button>
			</Container>
		</Modal>
	)
}