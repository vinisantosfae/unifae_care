import {ENDPOINTS} from "../../endpoints";

/**
 * Lista exercícios da prescrição aprovada ativa
 * @params
 * @return JSON
 **/
export async function getExercisesRoute(api, filter) {
    return api.get(ENDPOINTS.patient_app.exercises, {
        params: filter
    });
}

/**
 * Retorna plano semanal da prescriÃ§Ã£o ativa
 * @params
 * @return JSON
 **/
export async function planWeekRoute(api, filter) {
    return api.get(ENDPOINTS.patient_app.planWeek, {
        params: filter
    });
}

/**
 * Detalha um exercício da prescrição ativa
 * @params prescriptionItem_id
 * @return JSON
 **/
export async function getDetailedExerciseRoute(api, prescriptionItem_id, filter) {
    return api.get(`${ENDPOINTS.patient_app.exercises}/${prescriptionItem_id}`, {
        params: filter
    });
}

/**
 * Registra conclusão de exercício
 * @params prescriptionItem_id
 * @return execution_id
 **/
export async function completeExerciseRoute(api, prescriptionItem_id, data) {
    return api.post(`${ENDPOINTS.patient_app.exercises}/${prescriptionItem_id}/complete`, data);
}

/**
 * Registra feedback pós exercício para uma execução
 * @params execution_id
 * @return JSON
 **/
export async function exerciseFeedbackRoute(api, execution_id, data) {
    return api.post(`${ENDPOINTS.patient_app.executions}/${execution_id}/feedback`, data);
}
