import {api} from "../api/http";
import {loginRoute} from "../api/routes/auth/auth";
import {getAppId} from "./app_config";

export async function loginWithApi(email, password) {
    const client = await api();
    const appId = getAppId();
    const response = await loginRoute(client, {
        email,
        password,
        accessMode: "APP",
        appId,
    });

    return {
        accessToken: response.data.access_token,
        user: response.data.user,
        consentRequired: response.data.consentRequired ?? null,
        appId,
    };
}
