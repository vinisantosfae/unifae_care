let userToken;
let sessionData;
let unauthorizedHandler;

export function getUserToken() {
    return userToken;
}

export function setUserToken(token) {
    userToken = token;
}

export function clearUserToken() {
    userToken = null;
}

export function getSessionData() {
    return sessionData;
}

export function setSessionData(data) {
    sessionData = data;
}

export function clearSessionData() {
    sessionData = null;
}

export function setUnauthorizedHandler(handler) {
    unauthorizedHandler = handler;
}

export function clearUnauthorizedHandler() {
    unauthorizedHandler = null;
}

export function handleUnauthorized() {
    unauthorizedHandler?.();
}
