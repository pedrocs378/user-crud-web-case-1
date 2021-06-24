import styled from 'styled-components';

export const Container = styled.footer`
	grid-area: footer;
	background: var(--white);

	display: flex;
	align-items: center;
	justify-content: center;

	box-shadow: 0.5px 3px 10px rgba(0, 0, 0, 0.15);
	margin-left: 3px;

	strong {
		color: var(--gray-500);
		font-size: 0.875rem;

		span {
			color: var(--purple);
		}
	}
`;
