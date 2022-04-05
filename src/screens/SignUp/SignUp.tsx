import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {StackNavigationProp} from '@react-navigation/stack';
import {TextInput} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Layout from '../../components/Layout';
import {RootStackParamList, SingUpStackParamList} from '../../types';
import Button from '../../components/Button';
import Header from '../../components/Header';

export interface FormData {
	email: string;
}

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;
interface Props {
	navigation: SignUpScreenNavigationProp;
}

const Registration: React.FC<Props> = ({navigation}) => {
	const schema = Yup.object().shape({
		email: Yup.string()
			.matches(/(@itechart-group.com)/, {excludeEmptyString: true})
			.email()
			.required(),
	});
	const {
		control,
		formState: {errors, isValid},
		getValues,
	} = useForm<FormData>({
		resolver: yupResolver(schema),
		mode: 'onBlur',
	});

	const navigateLogin = (route: keyof RootStackParamList) => () => {
		navigation.navigate(route);
	};
	const navigatePassword = (route: keyof SingUpStackParamList) => () => {
		const dataToChange = {
			email: getValues('email'),
		};
		navigation.navigate(route, {
			userInfo: {...dataToChange},
		});
	};

	const disable = !isValid;

	return (
		<KeyboardAwareScrollView contentContainerStyle={styles.containerScrollView}>
			<ScrollView contentContainerStyle={styles.buttonGroup}>
				<Layout style={styles.layoutStyle}>
					<Header>Registration</Header>
					<Controller
						control={control}
						render={({field: {onChange, value, onBlur}}) => (
							<TextInput
								onChangeText={onChange}
								onBlur={onBlur}
								value={value === undefined ? value : value.trimLeft().replace(/\s+/g, ' ')}
								label="Email*"
								keyboardType="email-address"
								error={Boolean(errors.email)}
								style={styles.input}
								testID="email-input"
							/>
						)}
						name="email"
					/>
				</Layout>
				<View style={styles.buttons}>
					<View>
						<Button
							mode="contained"
							onPress={navigatePassword('CreatePassword')}
							disabled={disable}
							testID="btn-next-registration">
							Next
						</Button>
						<Button
							mode="text"
							onPress={navigateLogin('SignIn')}
							style={styles.buttonsTop}
							testID="discard-registration">
							I already have an account
						</Button>
					</View>
				</View>
			</ScrollView>
		</KeyboardAwareScrollView>
	);
};

export default Registration;

const styles = StyleSheet.create({
	containerScrollView: {
		height: '100%',
		flex: 1,
	},
	input: {marginTop: 16},
	buttonGroup: {display: 'flex', flexGrow: 1, justifyContent: 'space-between'},
	buttons: {marginHorizontal: 20},
	buttonsTop: {
		marginTop: 8,
	},
	layoutStyle: {flex: 1, justifyContent: 'flex-start'},
});
