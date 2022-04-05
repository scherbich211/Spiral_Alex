import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import CreatePassword from "../../../../src/screens/SignUp/Password";
import Registration from "../../../../src/screens/SignUp/SignUp";
import { DrawerStackParamList, RootStackParamList, SingUpStackParamList, TabBarStackParamList } from "../../../../src/types";

const {Navigator, Screen} = createNativeStackNavigator<RootStackParamList>();

export const renderWithRouter = (component: React.ReactNode, initialRoute?: "SignIn" | "SignUp" | "DrawerNavigator" | "Login" | keyof SingUpStackParamList | keyof DrawerStackParamList | keyof TabBarStackParamList | undefined ) => { 
    return (
        <NavigationContainer>
            <Navigator initialRouteName={initialRoute}>
                <Screen name="Registration" component={Registration} options={{headerShown: false}} />
                <Screen name="CreatePassword" component={CreatePassword} options={{headerShown: false}} />
                {component}
            </Navigator>
        </NavigationContainer>
    )
}