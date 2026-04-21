import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../screens/auth/LoginScreen";
import { RegisterScreen } from "../screens/auth/RegisterScreen";
import { RecoverPasswordScreen } from "../screens/auth/RecoverPasswordScreen";
import { RecoverAccessScreen } from "../screens/auth/RecoverAccessScreen";


const Stack = createStackNavigator();

export function AuthStack() {
    return (
        <Stack.Navigator id={"auth"} initialRouteName={"Login"}>
            <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
            <Stack.Screen name="Register" options={{ headerShown: false }} component={RegisterScreen} />
            <Stack.Screen name="RecoverPassword" options={{ headerShown: false }} component={RecoverPasswordScreen} />
            <Stack.Screen name="RecoverAccess" options={{ headerShown: false }} component={RecoverAccessScreen} />
        </Stack.Navigator>
    );
}
