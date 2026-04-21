import { createStackNavigator } from "@react-navigation/stack";
import { RegisterScreen } from "../screens/auth/RegisterScreen";


const Stack = createStackNavigator();

export function AuthStack() {
    return (
        <Stack.Navigator id={"auth"} initialRouteName={"Register"}>
            <Stack.Screen name="Register" options={{ headerShown: false }} component={RegisterScreen} />
        </Stack.Navigator>
    );
}