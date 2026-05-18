let app_id;

export function getAppId() {
    return app_id ?? Number(process.env.EXPO_PUBLIC_APP_ID ?? 1);
}

export function setAppId(id) {
    app_id = id;
}

export function clearAppId() {
    app_id = null;
}
