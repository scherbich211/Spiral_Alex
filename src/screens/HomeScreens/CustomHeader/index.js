import React from 'react';
import { Text, View } from 'react-native';

const CustomHeader = ({ title, subtitle, stylesTitle, stylesSubtitle }) => (
	<View style={{ flexDirection: 'column' }}>
		<Text style={stylesTitle}>{title}</Text>
		<Text style={stylesSubtitle}>{subtitle}</Text>
	</View>
);

export default CustomHeader;
