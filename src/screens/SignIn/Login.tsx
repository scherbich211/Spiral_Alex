import React, {useContext, useState} from 'react';
import {TextInput, useTheme} from 'react-native-paper';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Controller, useForm} from 'react-hook-form';
import {StackNavigationProp} from '@react-navigation/stack';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import Typography from '../../components/Typography';
import {useAppDispatch, useVisiability as useVisibility} from '../../hooks';
import TouchId from '../../../assets/Image/touchID.png';
import FaceId from '../../../assets/Image/faceID.png';
import {ILoginStyle} from '../../types/Login';
import {SIZES} from '../../theme';
import {RootStackParamList} from '../../types';
import {AuthContext} from '../../AuthProvider';
import {changeUserInfo, changeUserIsLoggedIn} from '../../redux/reducers/user';
import ButtonCustom from '../../components/Button';

type LogScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
	navigation: LogScreenNavigationProp;
}

type FormState = {
	login: string;
	password: string;
};

const LogIn: React.FC<Props> = (props): JSX.Element => {
	const theme = useTheme();
	const {login} = useContext(AuthContext);
	const dispatch = useAppDispatch();
	const styles = useStyles(theme);
	const [isVisible, visible] = useVisibility(true);
	const [isLoading, setIsLoading] = useState(false);

	const schema = Yup.object().shape({
		login: Yup.string()
			.matches(/(@itechart-group.com)/, {excludeEmptyString: true})
			.email()
			.required(),
		password: Yup.string().required(),
	});
	const {
		control,
		formState: {errors, isValid},
		getValues,
	} = useForm<FormState>({
		resolver: yupResolver(schema),
		mode: 'onBlur',
	});

	const handleLoginPress = async () => {
		setIsLoading(true);
		await login(getValues('login'), getValues('password'));
		setIsLoading(false);
		dispatch(changeUserIsLoggedIn(true));
		dispatch(changeUserInfo({email: getValues('login'), password: getValues('password')}));
	};
	return (
		<KeyboardAwareScrollView>
			<Layout>
				<View style={{height: SIZES.height * 0.85}}>
					<View style={{marginBottom: SIZES.height * 0.03, marginTop: SIZES.height * 0.05}}>
						<Header style={styles.header}>Login</Header>
						<View style={styles.loginUnderline} />
					</View>
					<View style={{marginBottom: SIZES.height * 0.22}}>
						<Controller
							control={control}
							render={({field: {onChange, value, onBlur}}) => (
								<TextInput
									onChangeText={onChange}
									onBlur={onBlur}
									value={value}
									label="Email"
									keyboardType="email-address"
									error={Boolean(errors.login)}
									style={styles.input}
									testID="email-input"
								/>
							)}
							name="login"
						/>
						<Controller
							control={control}
							render={({field: {onChange, value, onBlur}}) => (
								<TextInput
									onChangeText={onChange}
									onBlur={onBlur}
									value={value}
									label="Password"
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
									testID="password-input"
								/>
							)}
							name="password"
						/>

						<View style={{...styles.row, ...styles.centerAndBetween}}>
							<TouchableOpacity>
								<Typography color={theme.colors.primary} fontWeight="400">
									Forgot password?
								</Typography>
							</TouchableOpacity>
						</View>
					</View>
					<View>
						<View style={StyleSheet.flatten([styles.row, styles.centerAndBetween, styles.buttonContainer])}>
							<View style={styles.loginButton}>
								<ButtonCustom
									mode="contained"
									loading={isLoading}
									onPress={handleLoginPress}
									style={styles.buttonRadius}
									disabled={!isValid || isLoading}
									testID="login-btn">
									Login
								</ButtonCustom>
							</View>
						</View>
						<View style={styles.description}>
							<Typography color={theme.colors.placeholder}>Don&apos;t have an account? </Typography>
							<TouchableOpacity onPress={() => props.navigation.navigate('SignUp')}>
								<Typography color={theme.colors.primary} fontWeight="400">
									Register here
								</Typography>
							</TouchableOpacity>
						</View>
						<Typography style={styles.twoWaysLogIn}>Lets test 2 ways to log in</Typography>
						<View style={styles.ID}>
							<TouchableOpacity style={styles.buttonID}>
								<View style={styles.viewImage}>
									<Image source={FaceId} style={styles.image} />
									<Typography>Face ID</Typography>
								</View>
							</TouchableOpacity>
							<TouchableOpacity style={styles.buttonID}>
								<View style={styles.viewImage}>
									<Image source={TouchId} style={styles.image} />
									<Typography>Touch ID</Typography>
								</View>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Layout>
		</KeyboardAwareScrollView>
	);
};

const useStyles = StyleSheet.create(
	(theme: ReactNativePaper.Theme): ILoginStyle => ({
		input: {marginBottom: 16},
		row: {
			flexDirection: 'row',
		},
		centerAndBetween: {
			justifyContent: 'space-between',
			alignItems: 'center',
			alignSelf: 'flex-end',
		},
		divider: {
			width: '40%',
		},
		loginButton: {
			flex: 1,
		},
		buttonContainer: {
			marginTop: 34,
			marginBottom: 12,
		},
		mainFooter: {
			display: 'flex',
			flexGrow: 1,
			justifyContent: 'space-between',
		},
		paddingRight: {paddingRight: 8},
		text: {
			paddingTop: 6,
			flex: 1,
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
		},
		header: {marginBottom: 6, width: '22%', fontWeight: '400'},
		description: {flexDirection: 'row', marginBottom: 22, alignSelf: 'center'},
		ID: {
			flexDirection: 'row',
			justifyContent: 'space-between',
		},
		viewImage: {
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
		},
		image: {
			width: 25,
			height: 25,
			marginRight: 5,
		},
		twoWaysLogIn: {
			alignSelf: 'center',
			paddingTop: '5%',
			paddingBottom: '4%',
		},
		buttonID: {
			width: '48%',
			height: 50,
			borderColor: 'black',
			borderRadius: 50,
			borderWidth: 2,
			justifyContent: 'center',
			alignItems: 'center',
		},
		loginUnderline: {
			width: '22%',
			height: 3,
			backgroundColor: theme.colors.primary,
			borderRadius: 5,
			marginBottom: 20,
		},
		buttonRadius: {
			borderRadius: 50,
		},
	}),
);

export default LogIn;
