import {SerializedError} from '@reduxjs/toolkit';
import {FetchBaseQueryError} from '@reduxjs/toolkit/dist/query';
import React from 'react';
import {Snackbar} from 'react-native-paper';
import {getErrorPhone} from '../../utils/getError';

interface ErrorSnackbarProps {
	isSnackbarVisible: boolean;
	setIsSnackbarVisible: (boolean: boolean) => void;
	error: FetchBaseQueryError | SerializedError | undefined;
	children?: React.ReactNode;
}

const ErrorSnackbar: React.FunctionComponent<ErrorSnackbarProps> = props => {
	const onDismissSnackBar = () => props.setIsSnackbarVisible(false);

	return (
		<Snackbar
			visible={props.isSnackbarVisible}
			onDismiss={onDismissSnackBar}
			action={{
				label: 'OK',
				onPress: onDismissSnackBar,
			}}>
			{props.children || getErrorPhone(props.error) || 'An error has occurred, please try again later'}
		</Snackbar>
	);
};

export default ErrorSnackbar;
