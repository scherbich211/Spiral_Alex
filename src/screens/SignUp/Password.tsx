import React, {useContext, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {TextInput, HelperText, useTheme} from 'react-native-paper';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import DescriptionText from '../../components/DescriptionUnderHeader/DescriptionUnderHeader';
import ButtonCustom from '../../components/Button';
import {FormDataToPassword} from '../../types';
import {useAppDispatch, useVisiability} from '../../hooks';
import {AuthContext} from '../../AuthProvider';
import {changeUserInfo, changeUserIsLoggedIn} from '../../redux/reducers/user';

export interface ICFormDataPassword {
	password: string;
	confirmPassword: string;
}
const schema = Yup.object().shape({
	password: Yup.string()
		.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/)
		.required(),
	confirmPassword: Yup.string().when('password', {
		is: (value: string | unknown[]) => value && value.length > 0,
		then: Yup.string()
			.oneOf([Yup.ref('password')], 'Both passwords need to be the same')
			.required(),
	}),
});

interface Props {
	route: {
		params: {
			userInfo: FormDataToPassword;
		};
	};
}

const CreatePassword: React.FunctionComponent<Props> = (props): JSX.Element => {
	const theme = useTheme();
	const dispatch = useAppDispatch();
	const [isVisible, visible] = useVisiability(true);
	const [isLoading, setIsLoading] = useState(false);

	const {register} = useContext(AuthContext);

	const {
		control,
		formState: {errors, isValid},
		getValues,
	} = useForm<ICFormDataPassword>({
		resolver: yupResolver(schema),
		mode: 'onBlur',
	});

	const onSubmit = async () => {
		console.log(props.route.params.userInfo.email, getValues('password'));
		setIsLoading(true);
		await register(props.route.params.userInfo.email, getValues('password'));
		setIsLoading(false);
		dispatch(changeUserInfo({email: props.route.params.userInfo.email, password: getValues('password')}));
		dispatch(changeUserIsLoggedIn(true));
	};

	const isDisabled = !isValid || getValues('password').length === 0 || getValues('confirmPassword').length === 0;

	return (
		<KeyboardAwareScrollView contentContainerStyle={styles.mainFooter}>
			<ScrollView contentContainerStyle={styles.mainFooter}>
				<Layout>
					<View>
						<Header>Create password</Header>
						<DescriptionText>Create password for your login in the application</DescriptionText>
						<View>
							<Controller
								control={control}
								render={({field: {onChange, value, onBlur}}) => (
									<View style={styles.inputContainer}>
										<TextInput
											onBlur={onBlur}
											onChangeText={onChange}
											value={value === undefined ? value : value.trim()}
											label="New password"
											error={Boolean(errors.password)}
											style={styles.input}
											secureTextEntry={isVisible}
											right={
												<TextInput.Icon
													name={isVisible ? 'eye' : 'eye-off'}
													onPress={visible}
													color={theme.colors.disabled}
												/>
											}
										/>

										<HelperText type={errors.password ? 'error' : 'info'} style={styles.helperTextTitle}>
											Password must contain:
										</HelperText>
										<HelperText type={errors.password ? 'error' : 'info'}>at least 8 characters;</HelperText>
										<HelperText type={errors.password ? 'error' : 'info'}>
											uppercase and lowercase characters (a-z and A-Z);
										</HelperText>
										<HelperText type={errors.password ? 'error' : 'info'}>
											digits and punctuation characters (0-9 and !@#$%^&*);
										</HelperText>
									</View>
								)}
								name="password"
							/>

							<Controller
								control={control}
								render={({field: {onChange, value, onBlur}}) => (
									<View style={styles.inputContainer}>
										<TextInput
											onBlur={onBlur}
											onChangeText={onChange}
											value={value === undefined ? value : value.trim()}
											label="Confirm password"
											error={Boolean(errors.confirmPassword)}
											style={styles.input}
											secureTextEntry={isVisible}
											right={
												<TextInput.Icon
													name={isVisible ? 'eye' : 'eye-off'}
													onPress={visible}
													color={theme.colors.disabled}
												/>
											}
										/>
										<HelperText type={errors.confirmPassword ? 'error' : 'info'}>Both password must match.</HelperText>
									</View>
								)}
								name="confirmPassword"
							/>
						</View>
						<ButtonCustom
							onPress={onSubmit}
							disabled={isDisabled || isLoading}
							style={styles.button}
							mode="contained"
							loading={isLoading}>
							Setup password
						</ButtonCustom>
					</View>
				</Layout>
			</ScrollView>
		</KeyboardAwareScrollView>
	);
};

const styles = StyleSheet.create({
	main: {marginBottom: 8},
	input: {marginBottom: 4},
	inputContainer: {marginBottom: 16},
	button: {marginTop: 16},
	description: {marginBottom: 20},
	helperTextTitle: {
		fontWeight: 'bold',
	},
	mainFooter: {
		display: 'flex',
		flexGrow: 1,
		justifyContent: 'space-between',
	},
	flex: {flex: 1},
});

export default CreatePassword;
