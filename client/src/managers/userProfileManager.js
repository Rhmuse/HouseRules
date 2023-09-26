const _apiUrl = "/api/userprofile"

export const getUserProfiles = () => {
    return fetch(_apiUrl).then(res => res.json())
}

export const getUserProfileById = (userId) => {
    return fetch(`${_apiUrl}/${userId}`).then(res => res.json())
}