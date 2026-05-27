import {api} from "../api/http";
import {getBaseURL} from "../api/config";
import {getUserToken} from "./session";
import {
    completeExerciseRoute,
    exerciseFeedbackRoute,
    getDetailedExerciseRoute,
    getExercisesRoute,
    planWeekRoute,
} from "../api/routes/patient_app/exercises";
import {profilePhotoUpdateRoute, profileRoute} from "../api/routes/patient_app/profile";
import {homeRoute, motivationRoute, painRoute} from "../api/routes/patient_app/user_feedback";

async function getClient() {
    return api();
}

export async function getHomeSnapshot() {
    const client = await getClient();
    const response = await homeRoute(client);
    return response.data;
}

export async function getMotivation() {
    const client = await getClient();
    const response = await motivationRoute(client);
    return response.data;
}

export async function submitDailyPain(level) {
    const client = await getClient();
    const response = await painRoute(client, { level });
    return response.data;
}

export async function getExercises() {
    const client = await getClient();
    const response = await getExercisesRoute(client);
    return response.data;
}

export async function getPlanWeek() {
    const client = await getClient();
    const response = await planWeekRoute(client);
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

function getUploadFileName(asset) {
    if (asset.fileName) {
        return asset.fileName;
    }

    const uriParts = asset.uri.split("/");
    const uriName = uriParts[uriParts.length - 1];
    return uriName || "profile-photo.jpg";
}

export async function updateProfilePhoto(asset) {
    const client = await getClient();
    const formData = new FormData();

    if (asset.file) {
        formData.append("file", asset.file);
    } else {
        formData.append("file", {
            uri: asset.uri,
            name: getUploadFileName(asset),
            type: asset.mimeType ?? "image/jpeg",
        });
    }

    const response = await profilePhotoUpdateRoute(client, formData);
    return response.data;
}

export async function getAbsoluteApiUrl(path) {
    if (!path) {
        return null;
    }

    if (path.startsWith("http://") || path.startsWith("https://")) {
        return path;
    }

    const baseURL = await getBaseURL();
    const base = new URL(baseURL);

    if (path.startsWith("/")) {
        return `${base.origin}${path}`;
    }

    return `${baseURL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

export async function getAuthorizedPhotoSource(photoUrl) {
    const uri = await getAbsoluteApiUrl(photoUrl);

    if (!uri) {
        return null;
    }

    const token = getUserToken();

    return {
        uri,
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    };
}
