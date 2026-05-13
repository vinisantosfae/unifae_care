import {ENDPOINTS} from "../../endpoints";

/**
 * Lista apps ativos para seletor de login
 * @params
 * @return JSON
 **/
export async function getAppsRoute(api, filter) {
    return api.get(ENDPOINTS.auth.apps, {
        params: filter
    });
}

/**
 * Autentica usuário
 * @params [email, password, accessMode, appId]
 * @return JWT
 **/
export async function loginRoute(api, data) {
    return api.post(ENDPOINTS.auth.login, data);
}