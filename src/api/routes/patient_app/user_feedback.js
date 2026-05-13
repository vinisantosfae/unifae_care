import {ENDPOINTS} from "../../endpoints";

/**
 * Carrega a home do app do paciente
 * @params
 * @return JSON
 **/
export async function homeRoute(api, filter) {
    return api.get(ENDPOINTS.patient_app.home, {
        params: filter
    });
}

/**
 * Registra dor diário do paciente
 * @params [level]
 * @return JSON
 **/
export async function painRoute(api, data) {
    return api.post(ENDPOINTS.patient_app.pain, data);
}

/**
 * Retorna mensagem motivacional aleatória ativa
 * @params
 * @return JSON
 **/
export async function motivationRoute(api, filter) {
    return api.get(ENDPOINTS.patient_app.motivation, {
        params: filter
    });
}