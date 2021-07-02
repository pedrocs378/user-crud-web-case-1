import styled from 'styled-components';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MaterialUICheckbox from '@material-ui/core/Checkbox';

export const Container = styled(FormControlLabel)`
	width: 100%;
	height: 3rem;
	margin: 0;
	margin-top: 1.5rem;

	display: flex;
	align-items: center;
	justify-content: flex-start;

	span {
		&:first-child {
			padding: 0;
		}

		&:nth-child(2) {
			font-family: 'Open Sans', sans-serif;
			font-weight: 400;
			margin-left: 0.5rem;
		}
	}
`;

export const Checkbox = styled(MaterialUICheckbox)`
	
	svg {
		fill: var(--purple);
	}
`
