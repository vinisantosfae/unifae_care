import {createContext, useContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LOGGED_USER_KEY = "@CHECKEI_loggedd_user";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [user, setUserState] = useState(null);
    const [loading, setLoading] = useState(true);

    async function setUser(userData) {
        setUserState(userData);

        if (userData) {
            await AsyncStorage.setItem(LOGGED_USER_KEY, JSON.stringify(userData));
        } else {
            await AsyncStorage.removeItem(LOGGED_USER_KEY);
        }
    }

    async function loadLoggedUser() {
        try {
            const data = await AsyncStorage.getItem(LOGGED_USER_KEY);

            if (data) {
                setUserState(JSON.parse(data));
            }
        } catch (error) {
            console.log("Erro ao carregar usuário logado:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadLoggedUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    return useContext(AuthContext);
}