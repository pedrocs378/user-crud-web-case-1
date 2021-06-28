import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

export const Container = styled(TextField)`
	width: 100%;

	label {
		font-family: 'Open Sans', sans-serif;
		font-weight: 400;
		opacity: 0.5;
		color: var(--blue-dark);

		&:not(.MuiFormLabel-filled):not(.Mui-focused) {
			margin-top: 0.9rem;
		}
	}

	input {
		font: 600 1.18rem 'Open Sans', sans-serif;
		color: var(--blue-dark);
		opacity: 0.7;
		padding: 0.9rem 0;
	}

	.MuiInput-underline {
		&::before {
			border-color: var(--blue-dark);
			opacity: 0.2;
		}
	}

	svg {
		color: var(--blue-dark);
		opacity: 0.3;
	}
`;
