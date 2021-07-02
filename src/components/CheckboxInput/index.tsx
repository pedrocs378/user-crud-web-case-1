import { StylesProvider } from '@material-ui/core/styles';
import { CheckboxProps as MaterialUICheckboxProps } from '@material-ui/core/Checkbox';

import { Container, Checkbox } from './styles'

type CheckboxInputProps = MaterialUICheckboxProps & {
	label: string
}

export function CheckboxInput({ label, ...rest }: CheckboxInputProps) {

	return (
		<StylesProvider injectFirst>
			<Container
				control={
					<Checkbox
						{...rest}
					/>
				}
				label={label}
			/>
		</StylesProvider>
	)
}