import Modal, { Props as ModalProps } from 'react-modal'

import { Input } from '../Input'
import { Button } from '../Button'

import { Container } from './styles'

interface EditUserModalProps extends ModalProps {
	isOpen: boolean
	onRequestClose: () => void
}

export function EditUserModal({ isOpen, onRequestClose }: EditUserModalProps) {

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			className="react-modal-content"
			overlayClassName="react-modal-overlay"
		>
			<Container>
				<h2>Editar</h2>

				<Input
					className="input"
					name="name"
					label="Nome"
					placeholder="Digite seu nome"
				/>
				<Input
					className="input"
					name="email"
					label="E-mail"
					placeholder="youraddres@email.com"
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

				<Button type="submit">Confirmar</Button>

				<button type="button" onClick={onRequestClose}>
					Voltar
				</button>
			</Container>
		</Modal>
	)
}