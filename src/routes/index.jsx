import {ActivityIndicator, View} from "react-native";
import {useAuthContext} from "../contexts/AuthContext";
import {AuthStack} from "./AuthStack";
import AppDrawer from "./AppDrawer";

export function RootNavigation() {
    const { user, loading } = useAuthContext();

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return user ? <AppDrawer /> : <AuthStack />;
}