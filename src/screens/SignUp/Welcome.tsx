import React from 'react';
import {View, Image, StyleSheet, ImageStyle, TextStyle, ViewStyle} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import Layout from '../../components/Layout';
import Typography from '../../components/Typography';
import {RootStackParamList} from '../../types';
import Email from '../../../assets/Image/email.png';
import ButtonCustom from '../../components/Button';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

interface Props {
	navigation: NavigationProp;
}

const Welcome: React.FunctionComponent<Props> = ({navigation}) => {
	const navigate = () => {
		navigation.navigate('Login');
	};
	const styles = useStyles();
	return (
		<Layout justifyContent="center">
			<View>
				<View style={styles.imageContainer}>
					<Image style={styles.container} source={Email} />
				</View>
				<Typography element="h1" style={styles.title}>
					Welcome!
				</Typography>
				<Typography element="body" style={styles.description}>
					To remember yours login info please enter it one more time.
				</Typography>
				<ButtonCustom onPress={navigate} mode="contained">
					Go
				</ButtonCustom>
			</View>
		</Layout>
	);
};

type Styles = {
	imageContainer: ViewStyle;
	container: ImageStyle;
	description: TextStyle;
	title: TextStyle;
};

const useStyles = StyleSheet.create(
	(): Styles => ({
		imageContainer: {
			backgroundColor: 'rgba(56, 150, 203, 0.08)',
			borderRadius: 8,
			paddingVertical: 32,
			paddingHorizontal: 26,
			alignSelf: 'center',
			marginBottom: 24,
		},
		container: {
			height: 64,
			width: 64,
			resizeMode: 'stretch',
		},
		description: {
			textAlign: 'center',
			marginBottom: 24,
			lineHeight: 26,
			opacity: 0.6,
			fontSize: 18,
			marginTop: 15,
			fontWeight: '300',
		},
		title: {
			alignSelf: 'center',

			marginBottom: 10,
		},
	}),
);

export default Welcome;
