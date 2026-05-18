import 'react-native-gesture-handler';
import {createDrawerNavigator} from "@react-navigation/drawer";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import { HomeScreen } from "../screens/app/HomeScreen";
import { ProfileScreen } from "../screens/app/ProfileScreen";
import { ScheduleScreen } from "../screens/app/ScheduleScreen";
import { ProgressScreen } from "../screens/app/ProgressScreen";
import { ExerciseScreen } from "../screens/app/ExerciseScreen";
import { FeedbackScreen } from "../screens/app/FeedbackScreen";

const Drawer = createDrawerNavigator();

export default function AppDrawer() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer.Navigator
                id={"drawer"}
                initialRouteName="Feedback"
                screenOptions={{
                    drawerPosition: "right",
                    headerShown: false,
                }}
            >
                <Drawer.Screen name="Home" component={HomeScreen} />
                <Drawer.Screen name="Schedule" component={ScheduleScreen} />
                <Drawer.Screen name="Progress" component={ProgressScreen} />
                <Drawer.Screen name="Profile" component={ProfileScreen} />
                <Drawer.Screen name="Exercise" component={ExerciseScreen} />
                <Drawer.Screen name="Feedback" component={FeedbackScreen} />
            </Drawer.Navigator>
        </GestureHandlerRootView>
    );
}
