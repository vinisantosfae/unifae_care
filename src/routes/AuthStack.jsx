import { createStackNavigator } from "@react-navigation/stack";


const Stack = createStackNavigator();

export function AuthStack() {
    return (
        <Stack.Navigator id={"auth"} initialRouteName={"Login"} children={}>

        </Stack.Navigator>
    );
}