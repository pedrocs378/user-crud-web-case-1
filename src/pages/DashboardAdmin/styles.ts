import styled from 'styled-components';

export const Container = styled.div`
	display: grid;
	grid-template-rows: 6.25rem 1fr 5.0625rem;
	grid-template-columns: 20.625rem 1fr;
	grid-template-areas: 
		"menu header"
		"menu main"
		"menu footer";

	aside {
		grid-area: menu;
		height: 100vh;
		max-width: 100%;

		background: var(--white);
		box-shadow: 0.5px 3px 10px rgba(119, 119, 119, 0.1);
	}

	main {
		grid-area: main;

		> div {
			background: rgba(127, 99, 244, 0.1);
			height: 3.94rem;

			display: flex;
			align-items: center;
			padding: 0 2.25rem;

			gap: 0.8rem;

			h2 {
				color: var(--purple);
				font-size: 1.375rem;
				letter-spacing: 0.22px;
			}
		}

		section {
			padding: 0 1.5rem;

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
