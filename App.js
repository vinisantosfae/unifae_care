import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import { useFonts } from "expo-font";

export default function App() {
    const [fontsLoaded] = useFonts({
        "Fredoka-Bold": require("./src/assets/fonts/Fredoka/Fredoka-Bold.ttf"),
        "Fredoka-Light": require("./src/assets/fonts/Fredoka/Fredoka-Light.ttf"),
        "Fredoka-Regular": require("./src/assets/fonts/Fredoka/Fredoka-Regular.ttf"),
        "Fredoka-Medium": require("./src/assets/fonts/Fredoka/Fredoka-Medium.ttf"),
        "Fredoka-SemiBold": require("./src/assets/fonts/Fredoka/Fredoka-SemiBold.ttf"),
    });

    return (
        <AuthProvider>
            <NavigationContainer>
                <StatusBar style="dark" />
                <RootNavigation />
            </NavigationContainer>
        </AuthProvider>
    );
}