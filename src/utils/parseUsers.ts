import { format } from "date-fns"
import ptBR from 'date-fns/locale/pt-BR'

interface User {
	id: string
	name: string
	email: string
	isAdmin: boolean
	created_at: string
}

export function parseUsers(users: User[]) {
	return users.map(user => {
		return {
			...user,
			createdAtFormatted: format(new Date(user.created_at), 'dd/MM/yyyy', {
				locale: ptBR
			})
		}
	})
}