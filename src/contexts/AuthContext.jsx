import {createContext, useContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {clearAppId, setAppId} from "../services/app_config";
import {clearSessionData, clearUserToken, setSessionData, setUserToken} from "../services/session";

const SESSION_KEY = "@UNIFAE_CARE_session";

const AuthContext = createContext({
    user: null,
    session: null,
    setSession: async () => {},
    setUser: async () => {},
    loading: true,
});

export function AuthProvider({ children }) {
    const [user, setUserState] = useState(null);
    const [session, setSessionState] = useState(null);
    const [loading, setLoading] = useState(true);

    async function setSession(sessionData) {
        setSessionState(sessionData);
        setUserState(sessionData?.user ?? null);

        if (sessionData) {
            setUserToken(sessionData.accessToken);
            setSessionData(sessionData);
            setAppId(sessionData.appId);
            await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
            return;
        }

        clearUserToken();
        clearSessionData();
        clearAppId();
        await AsyncStorage.removeItem(SESSION_KEY);
    }

    async function setUser(userData) {
        if (!userData) {
            await setSession(null);
            return;
        }

        const nextSession = session ? { ...session, user: userData } : null;
        setUserState(userData);

        if (nextSession) {
            await setSession(nextSession);
        }
    }

    async function loadLoggedUser() {
        try {
            const data = await AsyncStorage.getItem(SESSION_KEY);

            if (data) {
                const storedSession = JSON.parse(data);
                setSessionState(storedSession);
                setUserState(storedSession.user);
                setUserToken(storedSession.accessToken);
                setSessionData(storedSession);
                setAppId(storedSession.appId);
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
        <AuthContext.Provider value={{ user, session, setSession, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    return useContext(AuthContext);
}
