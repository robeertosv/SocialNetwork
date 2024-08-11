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

export const fetchProfile = async (username) => {
    let body = JSON.stringify({ username })
    let options = {
        headers,
        body,
        method,
        redirect
    }

    let res = await fetch('http://localhost/api/users/getUserProfile', options)
    res = await res.json()
    res = JSON.parse(res)
    console.log(res)
    res = {
        nombre: res.name,
        biografia: res.bio,
        pic: res.pic != '' ? res.pic : null,
        verified: res.verified,
        seguidores: res.seguidores,
        seguidos: res.seguidos
    }


    return res
}

export const getUserPosts = async (username) => {
    let body = JSON.stringify({ username })
    let options = {headers, body, method, redirect}

    let res = await fetch('http://localhost/api/users/UID', options)
    res = await res.json()

    const UID = res.UID

    body = JSON.stringify({ UID })
    options = {headers, body, method, redirect}

    res = await fetch('http://localhost/api/posts/allPostUID', options)
    res = await res.json()

    return res
}