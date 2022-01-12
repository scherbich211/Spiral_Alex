import React from 'react';
import {StyleSheet, TextStyle} from 'react-native';
import Typography from '../Typography';

interface Props {
	children: React.ReactNode;
	style?: TextStyle;
}

const Header: React.FC<Props> = props => {
	return (
		<Typography element="h1" style={StyleSheet.flatten([styles.title, props.style])}>
			{props.children}
		</Typography>
	);
};

const styles = StyleSheet.create({
	title: {marginBottom: 20},
});

export default Header;
