export const postRequest = (url:string, body: Record<string, unknown>): Promise<Record<string, unknown>> => {
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
    return fetch(
        url,
        {
            headers,
            method: 'POST',
            body: JSON.stringify(body)
        }
    )
        .then((res) => res.status < 400 ? res.json() : Promise.reject(res.json()))
}
