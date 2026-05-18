import {api} from "../api/http";
import {
    completeExerciseRoute,
    exerciseFeedbackRoute,
    getDetailedExerciseRoute,
    getExercisesRoute,
} from "../api/routes/patient_app/exercises";
import {profileRoute} from "../api/routes/patient_app/profile";
import {homeRoute} from "../api/routes/patient_app/user_feedback";

async function getClient() {
    return api();
}

export async function getHomeSnapshot() {
    const client = await getClient();
    const response = await homeRoute(client);
    return response.data;
}

export async function getExercises() {
    const client = await getClient();
    const response = await getExercisesRoute(client);
    return response.data;
}

export async function getExerciseDetail(prescriptionItemId) {
    const client = await getClient();
    const response = await getDetailedExerciseRoute(client, prescriptionItemId);
    return response.data;
}

export async function completeExercise(prescriptionItemId) {
    const client = await getClient();
    const response = await completeExerciseRoute(client, prescriptionItemId, {});
    return response.data;
}

export async function submitExerciseFeedback(executionId, data) {
    const client = await getClient();
    const response = await exerciseFeedbackRoute(client, executionId, data);
    return response.data;
}

export async function getProfile() {
    const client = await getClient();
    const response = await profileRoute(client);
    return response.data;
}
