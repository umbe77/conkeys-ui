const conkeys_base_url = process.env.CONKEYS_URL

const mapKeys = (keys) => {
    return Object.entries(keys).map(([k, v]) => {
        return {
            ...v,
            key: k,
        }
    })
}

export const getKeys = async () => {
    const res = await fetch(`${conkeys_base_url}/api/keys`, {
        method: "GET",
    })
    if (!res.ok) {
        return []
    }
    return mapKeys(await res.json())
}

export const searchKeys = async (search) => {
    if (search.length === 0) {
        return []
    }
    const res = await fetch(`${conkeys_base_url}/api/keys/${search}`, {
        method: "GET",
    })
    if (!res.ok) {
        return []
    }
    return mapKeys(await res.json())
}

export const getKey = async (key, token = null) => {
    if (key?.length === 0) {
        return null
    }

    const k = await fetch(
        `${conkeys_base_url}/api/key/${encodeURIComponent(key)}`,
        {
            method: "GET",
        }
    ).then((resp) => resp.json())

    if (k.T === 5 && token !== null) {
        try {
            const kEnc = await fetch(
                `${conkeys_base_url}/api/key-enc/${encodeURIComponent(key)}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            ).then((resp) => resp.json())

            k.V = kEnc.V
        } catch (error) {
            console.error(error)
        }
    }

    return {
        ...k,
        key,
    }
}

export const saveKey = async (token, { key, T, V }) => {
    try {
        if (token?.length === 0 || key?.length === 0) {
            return {
                isLogged: false,
            }
        }
        await fetch(`${conkeys_base_url}/api/key/${encodeURIComponent(key)}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "content-type": "application/json",
            },
            body: JSON.stringify({
                T,
                V,
            }),
        })
    } catch (error) {
        throw error
    }
}

export const login = async (userName, password) => {
    if (userName?.length === 0 || password?.length === 0) {
        return {
            token: "",
            isLogged: false,
        }
    }
    const tk = await fetch(`${conkeys_base_url}/api/token`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            userName: userName,
            password,
        }),
    }).then((resp) => resp.json())

    return {
        ...tk,
        isLogged: true,
    }
}

export const getUser = async (token, userName) => {
    if (token?.length === 0 || userName?.length === 0) {
        return {
            isLogged: false,
        }
    }
    return await fetch(`${conkeys_base_url}/api/user/${userName}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "application/json",
        },
    }).then((resp) => resp.json())
}

export const getUsers = async (token, usr) => {
    if (token?.length === 0) {
        return {
            isLogged: false,
        }
    }

    const respUsers = await fetch(`${conkeys_base_url}/api/users`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "application/json",
        },
    })
    if (!respUsers.ok) {
        throw new Error(respUsers.errorMessage)
    }
    return await respUsers.json()
}

export const addUser = async (token, user) => {
    if (token?.length === 0 || user?.length === 0) {
        return {
            isLogged: false,
        }
    }

    const respUser = await fetch(`${conkeys_base_url}/api/user`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "application/json",
        },
        body: JSON.stringify(user),
    })
    if (!respUser.ok) {
        throw new Error(respUser.errorMessage)
    }
    return await respUser.json()
}

export const saveUser = async (token, user) => {
    if (token?.length === 0 || user?.length === 0) {
        return {
            isLogged: false,
        }
    }

    const respUser = await fetch(`${conkeys_base_url}/api/user`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "application/json",
        },
        body: JSON.stringify(user),
    })
    if (!respUser.ok) {
        throw new Error(respUser.errorMessage)
    }
    return await respUser.json()
}
