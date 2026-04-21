import 'react-native-gesture-handler';
import {createDrawerNavigator} from "@react-navigation/drawer";
import {GestureHandlerRootView} from "react-native-gesture-handler";

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

            </Drawer.Navigator>
        </GestureHandlerRootView>
    );
}