let userToken;

export function getUserToken() {
    return userToken;
}

export function setUserToken(token) {
    userToken = token;
}

export function clearUserToken() {
    userToken = null;
}