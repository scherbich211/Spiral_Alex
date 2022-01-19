import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {StackNavigationProp} from '@react-navigation/stack';
// import {useAppSelector} from '../../hooks';

import {TextInput} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import TextInputMask from 'react-native-text-input-mask';
import Layout from '../../components/Layout';
import {RootStackParamList, SingUpStackParamList} from '../../types';
import Button from '../../components/Button';
import Header from '../../components/Header';
import {IUsers} from '../../redux/reducers/database';

export type RegisterForm = IUsers;

export interface FormData {
	firstName: string;
	lastName: string;
	email: string;
	birth: string;
	avatar: string;
}

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;
interface Props {
	navigation: SignUpScreenNavigationProp;
}

const Registration: React.FC<Props> = ({navigation}) => {
	// const userInfo = useAppSelector(state => state.database);

	const schema = Yup.object().shape({
		firstName: Yup.string()
			.matches(/[^0-9\s]/g)
			.required(),
		lastName: Yup.string()
			.matches(/[^0-9\s]/g)
			.required(),
		email: Yup.string()
			.matches(/(@itechart-group.com)/, {excludeEmptyString: true})
			.email()
			.required(),
		birth: Yup.string().required(),
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
			firstName: getValues('firstName'),
			lastName: getValues('lastName'),
			email: getValues('email'),
			birth: getValues('birth'),
			avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
		};
		navigation.navigate(route, {
			userInfo: {...dataToChange},
		});
	};

	const disable = !isValid;

	return (
		<KeyboardAwareScrollView contentContainerStyle={styles.containerScrollView}>
			<ScrollView contentContainerStyle={styles.buttonGroup}>
				<Layout>
					<View>
						<View>
							<Header>Registration</Header>
							<View>
								<View>
									<Controller
										control={control}
										render={({field: {onChange, value, onBlur}}) => (
											<TextInput
												onChangeText={onChange}
												value={value === undefined ? value : value.trimLeft().replace(/\s+/g, ' ')}
												label="First name*"
												error={Boolean(errors.firstName)}
												style={styles.input}
												onBlur={onBlur}
											/>
										)}
										name="firstName"
									/>
									<Controller
										control={control}
										render={({field: {onChange, value, onBlur}}) => (
											<TextInput
												onChangeText={onChange}
												value={value === undefined ? value : value.trimLeft().replace(/\s+/g, ' ')}
												label="Last name*"
												error={Boolean(errors.lastName)}
												style={styles.input}
												onBlur={onBlur}
											/>
										)}
										name="lastName"
									/>
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
											/>
										)}
										name="email"
									/>
									<Controller
										control={control}
										render={({field: {onChange, value, onBlur}}) => (
											<TextInput
												onChangeText={onChange}
												value={value}
												label="Date of Birth*"
												placeholder="mm/dd/yyyy"
												error={Boolean(errors.birth)}
												style={styles.input}
												onBlur={onBlur}
												render={props => {
													// eslint-disable-next-line @typescript-eslint/ban-ts-comment
													// @ts-ignore
													return <TextInputMask {...props} mask="[00]/[00]/[0000]" />;
												}}
											/>
										)}
										name="birth"
									/>
								</View>
							</View>
						</View>
					</View>
				</Layout>
				<View style={styles.buttons}>
					<View>
						<Button mode="contained" onPress={navigatePassword('CreatePassword')} disabled={disable}>
							Next
						</Button>
						<Button mode="text" onPress={navigateLogin('SignIn')} style={styles.buttonsTop}>
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
	input: {marginBottom: 16},
	buttonGroup: {display: 'flex', flexGrow: 1, justifyContent: 'space-between'},
	buttons: {marginHorizontal: 20},
	buttonsTop: {
		marginTop: 8,
	},
});
