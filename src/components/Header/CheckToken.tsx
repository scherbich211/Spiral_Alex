import React, {useCallback, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import {createSelector} from '@reduxjs/toolkit';
import messaging from '@react-native-firebase/messaging';
import {
	changeInternetConnection,
	changeTokens,
	changeUserIsSignedIn,
	setFireBaseToken,
	setLastLogin,
} from '../../redux/reducers/user';
import {SignInRequest, refreshTokenResponse, SignInResponse} from '../../types/user';
import {usePostUserRefreshTokenMutation, usePostUserSignInMutation} from '../../api/user';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {RootState} from '../../types/redux';
import {fetchTokenStatus} from './tokenFetchStatus';
import {getFcmToken} from '../../utils/getFcmToken';
import {useChangeUserProfileInfoMutation} from '../../api/profile';
import {clearStoryInfo} from '../../redux/reducers/story';
import {clearAvatar} from '../../redux/reducers/profile';
import {clearNotificationsInfo} from '../../redux/reducers/notifications';
import {clearProfileInfo} from '../../redux/reducers/userInfo';

const selectSelf = (state: RootState) => state;
const loginUser = createSelector(selectSelf, state => state.user.loginUser);

// Component for Refresh token when the lifetime is less than 1500
// Need rewrite this component because have many troubles
const CheckToken: React.FC = () => {
	const dispatch = useAppDispatch();
	const singleStatus = fetchTokenStatus.getInstance();

	const isFocused = useIsFocused();

	const {firebaseToken, lastLogin, accessTokenExpireSeconds, refreshToken, accessToken, userInfo, isSignedIn} =
		useAppSelector(state => state.user);
	const integrationToken = useAppSelector(state => state.profile.integrationToken);
	const loginUserMemo = React.useMemo(() => loginUser, []);
	const {rememberMe, emailOrPhoneNumber, password} = useAppSelector(loginUserMemo, () => true);

	const [postRefreshToken, {isSuccess: isRefreshSuccess, isError: isRefreshError, data: refreshData}] =
		usePostUserRefreshTokenMutation();

	const [postSignIn, {isSuccess: isSingInSuccess, isError: isSingError, data: singInData}] =
		usePostUserSignInMutation();

	// const [postSignInWithGoogle, {isSuccess: isGoogleSuccess, isError: isGoogleError, data: googleData}] =
	// 	usePostLoginWithGoogleMutation();

	const [changeUserProfileInfo] = useChangeUserProfileInfoMutation();

	const tokenPush = (tokenFB: string) => {
		changeUserProfileInfo({
			token: accessToken,
			body: {
				firstName: userInfo.firstName,
				lastName: userInfo.lastName,
				phone: userInfo.phone,
				email: userInfo.email,
				employer: userInfo.employer,
				dob: userInfo.dob,
				creationDate: '2021-09-20T12:12:14.075Z',
				creationProfileDate: '2021-09-20T12:12:14.075Z',
				currentSavingsPlan: 1,
				enableNotifications: true,
				integrationToken,
				lastActivity: '2021-09-20T12:12:14.075Z',
				scoreRate: 0,
				firebaseToken: tokenFB,
			},
		});
	};

	useEffect(() => {
		return () => {
			singleStatus.changeStatus(false);
		};
	}, []);

	const lifeTime = accessTokenExpireSeconds - (new Date().getTime() - lastLogin) / 1000;

	// useEffect(() => {
	// 	if (googleData && isGoogleSuccess) {
	// 		singleStatus.changeStatus(false);
	// 		addInfo(googleData);
	// 	}
	// }, [isGoogleSuccess, googleData]);

	useEffect(() => {
		if (singInData && isSingInSuccess) {
			singleStatus.changeStatus(false);
			addInfo(singInData);
		}
	}, [isSingInSuccess, singInData]);

	useEffect(() => {
		if (refreshData && isRefreshSuccess) {
			singleStatus.changeStatus(false);
			addInfo(refreshData);
		}
	}, [isRefreshSuccess, refreshData]);

	useEffect(() => {
		if (isSingError) {
			singleStatus.changeStatus(false);
			logOut();
		}
	}, [isSingError]);

	useEffect(() => {
		if (isRefreshError) {
			reLogin(true);
		}
	}, [isRefreshError]);

	const addInfo = (server: SignInResponse | undefined) => {
		if (server) {
			const tokens: refreshTokenResponse = {
				accessToken: server.accessToken,
				accessTokenExpireSeconds: server.accessTokenExpireSeconds,
				refreshToken: server.refreshToken,
			};
			dispatch(changeTokens(tokens));
			dispatch(setLastLogin(new Date().getTime()));
		}
	};

	// const SignInWithGoogle = async () => {
	// 	const isConnected = await GoogleSignIn.isConnectedAsync();
	// 	const isSigned = await GoogleSignIn.isSignedInAsync();
	// 	if (isConnected && isSigned) {
	// 		const user = GoogleSignIn.getCurrentUser();
	// 		if (user?.auth?.idToken) {
	// 			postSignInWithGoogle({token: user?.auth?.idToken, firebaseToken});
	// 		}
	// 	} else {
	// 		const {user} = await GoogleSignIn.signInAsync();
	// 		if (user?.auth?.idToken) {
	// 			postSignInWithGoogle({token: user?.auth?.idToken, firebaseToken});
	// 		}
	// 	}
	// };

	const logOut = useCallback(() => {
		// if (loginWithGoogle) {
		// 	GoogleSignIn.disconnectAsync();
		// }
		singleStatus.changeStatus(false);
		dispatch(clearAvatar());
		dispatch(clearProfileInfo());
		dispatch(clearStoryInfo());
		dispatch(clearNotificationsInfo());
		dispatch(changeUserIsSignedIn(!isSignedIn));
	}, []);

	const reLogin = (isNecessarily: boolean) => {
		singleStatus.changeStatus(true);
		if (isNecessarily) {
			// if (loginWithGoogle) {
			// 	SignInWithGoogle();
			// } else {
			const dataToChange: SignInRequest = {
				password,
				emailOrPhoneNumber,
				rememberMe,
				firebaseToken,
			};
			postSignIn(dataToChange);
			// }
		} else {
			if (rememberMe) {
				const dataToChange: SignInRequest = {
					password,
					emailOrPhoneNumber,
					rememberMe,
					firebaseToken,
				};
				postSignIn(dataToChange);
			}
			// if (loginWithGoogle) {
			// 	SignInWithGoogle();
			// }
			else {
				logOut();
			}
		}
	};

	const checkFirebaseToken = async () => {
		const permission = await messaging().hasPermission();
		if (permission === messaging.AuthorizationStatus.DENIED && firebaseToken !== '') {
			dispatch(setFireBaseToken(''));
			tokenPush('');
		}
		if (
			(permission === messaging.AuthorizationStatus.AUTHORIZED ||
				permission === messaging.AuthorizationStatus.PROVISIONAL) &&
			firebaseToken === ''
		) {
			const token = await getFcmToken();
			if (token) {
				dispatch(setFireBaseToken(token));
				tokenPush(token);
			}
		}
	};

	const checkRefresh = () => {
		checkFirebaseToken();
		if (!accessToken || !refreshToken) {
			reLogin(true);
		} else {
			// Check if lifetime is less then 0 and user checked rememberMe (reLogin)
			if (lifeTime <= 0) {
				reLogin(false);
			}
			// Check if lifetime is between 1500 (25 min) and 0 (refresh access and refresh tokens)
			if (lifeTime > 0 && lifeTime < 1500) {
				singleStatus.changeStatus(true);
				postRefreshToken({refreshToken, token: accessToken});
			}
		}
	};

	useEffect(() => {
		// check token status when we navigate to display screen and now request for token refresh has not been started
		if (isFocused && !singleStatus.getStatus()) {
			checkRefresh();
		}
		NetInfo.fetch().then(state => {
			dispatch(changeInternetConnection(state.isConnected));
		});
	}, [isFocused]);

	return <></>;
};

export default React.memo(CheckToken, () => {
	return true;
});
