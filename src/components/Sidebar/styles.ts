import styled from "styled-components";

export const Container = styled.aside`
	grid-area: menu;
	height: 100vh;
	max-width: 100%;

	background: var(--white);
	box-shadow: 0.5px 3px 10px rgba(119, 119, 119, 0.1);
`

export const Navigation = styled.nav`
	margin-top: 2.875rem;

	strong {
		font-size: 0.75rem;
		letter-spacing: 0.24px;
		text-transform: uppercase;
		color: var(--gray-300);

		margin-left: 3.56rem;
	}

	ul {
		list-style: none;
		margin-top: 1.25rem;
	}
`