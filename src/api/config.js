export async function getBaseURL() {
    return process.env.EXPO_PUBLIC_API_BASE_URL ?? "http://185.217.125.219:3000/api/v1/";
}
