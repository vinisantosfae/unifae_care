import {ENDPOINTS} from "../../endpoints";

/**
 * Retorna perfil do paciente e contatos responsáveis
 * @params
 * @return JSON
 **/
export async function profileRoute(api, filter) {
    return api.get(ENDPOINTS.patient_app.profile, {
        params: filter
    });
}

/**
 * Atualiza foto do perfil do paciente logado
 * @params [file]
 * @return JSON
 **/
export async function profilePhotoUpdateRoute(api, data) {
    return api.post(`${ENDPOINTS.patient_app.profile}/photo`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

/**
 * Lê foto autorizada para o contexto do paciente
 * @params user_id
 * @return JSON
 **/
export async function profilePhotoRoute(api, user_id, data) {
    return api.get(`${ENDPOINTS.patient_app.profile}/photo/${user_id}`, data);
}
