import 'react-native-gesture-handler';
import {createDrawerNavigator} from "@react-navigation/drawer";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import { ProfileScreen } from "../screens/app/ProfileScreen";

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
                <Drawer.Screen name="Profile" component={ProfileScreen} />
            </Drawer.Navigator>
        </GestureHandlerRootView>
    );
}
