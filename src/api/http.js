import {getBaseURL} from "./config";
import {getUserToken} from "../services/session";
import axios from "axios";

export async function api() {
    const baseURL = await getBaseURL();

    const client = axios.create({
        baseURL,
        timeout: 30000,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        responseType: "json",
    });

    client.interceptors.request.use(
        async (config) => {
            const token = getUserToken();

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        }
    );

    client.interceptors.response.use(
        (response) => {
            return response;
        },
        async error => {
            console.log('ERROR: ', error);

            return Promise.reject(error);
        }
    );

    return client;
}
