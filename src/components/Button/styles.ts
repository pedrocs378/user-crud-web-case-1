import styled from 'styled-components';

export const Container = styled.button`
	height: 4.68rem;
	width: 100%;

	display: flex;
	align-items: center;
	justify-content: center;

	background: var(--purple);
	color: var(--white);
	
	border: 0;
	border-radius: 0.5rem;
	text-transform: uppercase;
	font-size: 1.1875rem;

	transition: filter 0.2s;

	&:hover {
		filter: brightness(0.9);
	}
`;
