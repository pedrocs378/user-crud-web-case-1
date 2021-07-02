import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

type ContainerProps = {
	isActive: boolean
}

const activeStyles = css`
	border-left-color: var(--purple);
	color: var(--purple);
	background: rgba(127, 99, 244, 0.1);

	svg {
		color: var(--purple);	
	}
`

export const Container = styled(Link) <ContainerProps>`
	position: relative;
	display: flex;
	align-items: center;

	width: 100%;
	height: 3.75rem;
	padding-left: calc(3.56rem - 5px);
	border-left: 5px solid transparent;

	text-decoration: none;
	color: var(--gray-600);
	font-size: 1rem;
	font-weight: 700;

	transition: ease 0.3s;

	svg {
		height: 1.6rem;
		width: 1.6rem;
		color: var(--gray-400);
		margin-right: 0.75rem;

		transition: ease 0.3s;
	}

	&:hover {
		${activeStyles}
	}

	${({ isActive }) => isActive && activeStyles}
`