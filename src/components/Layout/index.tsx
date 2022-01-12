import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

interface LayoutProps {
	style?: ViewStyle;
	justifyContent?: ViewStyle['justifyContent'];
}

const Layout: React.FunctionComponent<LayoutProps> = props => {
	const {justifyContent = 'space-between'} = props;
	const styles = useStyles(justifyContent);
	return <View style={StyleSheet.flatten([styles.main, props.style])}>{props.children}</View>;
};

type Styles = {
	main: ViewStyle;
};

const useStyles = StyleSheet.create(
	(justifyContent: LayoutProps['justifyContent']): Styles => ({
		main: {
			flex: 1,
			paddingTop: 30,
			paddingHorizontal: 20,
			height: '100%',
			justifyContent,
		},
	}),
);

export default Layout;
