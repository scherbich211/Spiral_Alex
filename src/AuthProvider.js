/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/jsx-filename-extension */
import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';

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
						await auth()
							.createUserWithEmailAndPassword(email, password)
							.then(() => {
								// Once the user creation has happened successfully, we can add the currentUser into firestore
								// with the appropriate details.
								firestore()
									.collection('users')
									.doc(auth().currentUser.uid)
									.set({
										fullName: '',
										email,
										createdAt: firestore.Timestamp.fromDate(new Date()),
										userImg: null,
									})
									// ensure we catch any errors at this stage to advise us if something does go wrong
									.catch(error => {
										console.log('Something went wrong with added user to firestore: ', error);
									});
							})
							// we need to catch the whole sign up process if it fails too.
							.catch(error => {
								console.log('Something went wrong with sign up: ', error);
							});
					} catch (e) {
						console.log(e);
					}
				},
				logout: async () => {
					try {
						await auth().signOut();
					} catch (e) {
						console.log(e);
					}
				},
			}}>
			{children}
		</AuthContext.Provider>
	);
};
