let headers = new Headers()
headers.append('Content-Type', 'application/json')
const method = 'POST'
const redirect = 'follow'

export const checkUsername = async (username) => {
    let body = JSON.stringify({ username })
    let options = {
        headers,
        body,
        method,
        redirect
    }

    let res = await fetch('http://localhost/api/users/checkUsername', options)

    res = await res.json()

    return await res.exist
}