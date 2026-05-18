let userToken;
let sessionData;

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
