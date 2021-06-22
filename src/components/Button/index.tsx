import { ButtonHTMLAttributes } from "react"

import { Container } from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ ...rest }: ButtonProps) {

	return (
		<Container
			{...rest}
		/>
	)
}