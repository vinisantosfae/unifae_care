import 'react-native-gesture-handler';
import {createDrawerNavigator} from "@react-navigation/drawer";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import { HomeScreen } from "../screens/app/HomeScreen";

const Drawer = createDrawerNavigator();

export default function AppDrawer() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer.Navigator
                id={"drawer"}
                screenOptions={{
                    drawerPosition: "right",
                    headerShown: false,
                }}
            >
                <Drawer.Screen name="Home" component={HomeScreen} />
            </Drawer.Navigator>
        </GestureHandlerRootView>
    );
}
