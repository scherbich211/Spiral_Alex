/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/jsx-filename-extension */
import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';

export const AuthContext = createContext();
export const AuthProvider = ({children}) => {
	const [user, setUser] = useState(null);

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
				login: async (email, password) => {
					try {
						await auth().signInWithEmailAndPassword(email, password);
					} catch (e) {
						if (e.code === 'auth/user-not-found') {
							Alert.alert('That user is invalid!');
						}
						if (e.code === 'auth/wrong-email') {
							Alert.alert('That user is invalid!');
						}
						if (e.code === 'auth/wrong-password') {
							Alert.alert('That password is invalid!');
						}
						// Alert.alert(String(e));
					}
				},
				register: async (email, password) => {
					try {
						await auth().createUserWithEmailAndPassword(email, password);
					} catch (e) {
						if (e.code === 'auth/email-already-in-use') {
							Alert.alert('That email address is already in use!');
						}
						if (e.code === 'auth/invalid-email') {
							Alert.alert('That email address is invalid!');
						}
						// Alert.alert(String(e));
					}
				},
				logout: async () => {
					try {
						await auth().signOut();
					} catch (e) {
						Alert.alert(String(e));
					}
				},
			}}>
			{children}
		</AuthContext.Provider>
	);
};
