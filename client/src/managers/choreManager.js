const _apiUrl = "/api/chore";

export const getChores = () => {
    return fetch(_apiUrl).then(res => res.json());
}

export const deleteChore = (choreId) => {
    return fetch(`${_apiUrl}/${choreId}`, {
        method: "DELETE"
    })
}

export const getChoreById = (choreId) => {
    return fetch(`${_apiUrl}/${choreId}`).then(res => res.json());
}

export const addChore = (chore) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(chore)
    }).then(res => res.json());
}