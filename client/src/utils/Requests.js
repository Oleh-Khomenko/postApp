export function getRequest(url) {
    return fetch(url).then(data => data.json())
}

export function postRequest(url, data) {
    return fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(resp => resp.json())
}

export function deleteRequest(url, data) {
    return fetch(url, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(resp => resp.json())
}