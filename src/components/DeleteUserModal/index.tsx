import { useState, useCallback } from 'react'
import Modal, { Props as ModalProps } from 'react-modal'
import { toast } from 'react-hot-toast'
import Loading from 'react-loading'

import { Button } from '../Button'

import { api } from '../../services/api'

import depressonPersonImg from '../../assets/depression-person.svg'

import { Container } from './styles'

interface EditUserModalProps extends ModalProps {
	isOpen: boolean
	userId: string
	onRequestClose: () => void
}

export function DeleteUserModal({ isOpen, userId, onRequestClose }: EditUserModalProps) {
	const [isLoading, setIsLoading] = useState(false)

	const handleDeleteUser = useCallback(async () => {
		setIsLoading(true)

		try {
			if (!userId.trim()) {
				return
			}

			const response = await api.delete(`/users/${userId}`)

			onRequestClose()
			toast.success(`${response.data.name} foi excluido`)
		} catch {
			toast.error('Não foi possivel excluir o usuário')
		} finally {
			setIsLoading(false)
		}
	}, [userId, onRequestClose])

	return (
		<Modal
			appElement={document.getElementById('root') as HTMLElement}
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			className="react-modal-content"
			overlayClassName="react-modal-overlay"
		>
			<Container>
				<img
					src={depressonPersonImg}
					alt="Pessoa triste em baixo da chuva"
				/>

				<section>
					<h2>Você realmente deseja excluir o usuário?</h2>

					<div>
						<button type="button" onClick={handleDeleteUser}>
							{isLoading ? (
								<Loading
									type="spinningBubbles"
									height={26}
									width={26}
								/>
							) : "Confirmar"}
						</button>

						<Button type="button" onClick={onRequestClose}>
							Não
						</Button>
					</div>
				</section>
			</Container>
		</Modal>
	)
}