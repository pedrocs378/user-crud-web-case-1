import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { StylesProvider } from '@material-ui/core/styles';
import { StandardTextFieldProps } from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

import { Container } from './styles'

interface InputProps extends StandardTextFieldProps {
	isPassword?: boolean
}

export function Input({ isPassword = false, ...rest }: InputProps) {
	const [showPassword, setShowPassoword] = useState(false)

	if (isPassword) {
		return (
			<StylesProvider injectFirst>
				<Container
					type={showPassword ? "text" : "password"}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									onClick={() => setShowPassoword(state => !state)}
								>
									{showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
								</IconButton>
							</InputAdornment>
						)
					}}
					{...rest}
				/>
			</StylesProvider>
		)
	} else {
		return (
			<StylesProvider injectFirst>
				<Container
					{...rest}
				/>
			</StylesProvider>
		)
	}
}