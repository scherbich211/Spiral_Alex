import React from 'react';
import {StyleSheet, TextStyle} from 'react-native';
import Typography from '../Typography';

interface Props {
	children: React.ReactNode;
	style?: TextStyle;
}

const DescriptionText: React.FC<Props> = props => {
	return (
		<Typography element="h3" fontWeight="300" style={StyleSheet.flatten([styles.title, props.style])}>
			{props.children}
		</Typography>
	);
};

const styles = StyleSheet.create({
	title: {marginBottom: 20, fontSize: 16, lineHeight: 24},
});

export default DescriptionText;
