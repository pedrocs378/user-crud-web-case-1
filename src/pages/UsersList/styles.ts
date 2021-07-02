import styled from 'styled-components';

export const Container = styled.main`
	grid-area: main;

	section {
		max-width: 1440px;
		margin: 0 auto;

		padding: 0 1rem;

		table {
			margin-top: 2.5rem;
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
