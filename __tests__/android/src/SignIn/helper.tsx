import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { render, waitFor } from "@testing-library/react-native";
import React from "react";
import { Provider } from "react-redux";
import { AuthProvider } from "../../../../src/AuthProvider";
import store from "../../../../src/redux/store";
import SignIn from "../../../../src/screens/SignIn";
import SignUp from "../../../../src/screens/SignUp";
import { DrawerStackParamList, RootStackParamList, SingUpStackParamList, TabBarStackParamList } from "../../../../src/types";

const {Navigator, Screen} = createNativeStackNavigator<RootStackParamList>();

export const renderWithRouter = (component: React.ReactNode, initialRoute?: "SignIn" | "SignUp" | "DrawerNavigator" | "Login" | keyof SingUpStackParamList | keyof DrawerStackParamList | keyof TabBarStackParamList | undefined ) => { 
    return (
        <Provider store={store}>
			<AuthProvider>
                <NavigationContainer>
                    <Navigator initialRouteName={initialRoute}>
                            <Screen name="SignIn" component={SignIn} options={{headerShown: false}} /> 
                            <Screen name="SignUp" component={SignUp} options={{headerShown: false}} />
                            {component}
                    </Navigator>
                </NavigationContainer>
            </AuthProvider>
		</Provider>
    )
}

describe('Helper', () => {
	it('Render Helper', async () => {
		const rendering = await waitFor(() =>
			render(renderWithRouter(null,'Registration')),
		);
		rendering.unmount();
	});
});
