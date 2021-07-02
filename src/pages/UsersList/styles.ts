import styled from 'styled-components';

export const Container = styled.main`
	grid-area: main;

	section {
		max-width: 1440px;
		margin: 0 auto;

		padding: 0 1rem;

		table {
			margin-top: 4.81rem;
			width: 100%;
			border-collapse: collapse;
			
			th, td {
				padding: 0.75rem 1rem;
				text-align: center;
			}

			th {
				color: var(--blue-grayish-800);
				font-size: 1.125rem;
			}

			tbody {	
				tr.spacing {
					height: 0.5rem;
				}

				tr:not(.spacing) {
					height: 5.25rem;
					background: var(--white);
					box-shadow: 0.5px 3px 10px rgba(119, 119, 119, 0.1);

					td {	
						color: var(--blue-grayish-800);
						font-weight: 700;
						
						button {
							color: var(--purple);
						}

						&.button {
							width: 4rem;
						}

						&:first-child {
							border-top-left-radius: 8px;
							border-bottom-left-radius: 8px;
						}

						&:last-child {		
							border-top-right-radius: 8px;
							border-bottom-right-radius: 8px;
						}
					}
				}
			}
		}
	}
`;

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

		a {
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
				height: 1.4rem;
				width: 1.4rem;
				color: var(--gray-400);
				margin-right: 0.75rem;

				transition: ease 0.3s;
			}

			&:hover {
				border-left-color: var(--purple);
				color: var(--purple);
				background: rgba(127, 99, 244, 0.1);

				svg {
					color: var(--purple);	
				}
			}
		}
	}
`