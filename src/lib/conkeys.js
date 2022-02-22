const mapKeys = (keys) => {
    return Object.entries(keys).map(([k, v]) => {
        return {
            ...v,
            key: k,
        }
    })
}

export const getKeys = async () => {
    const res = await fetch(`/api/keys`, {
        method: "GET",
    })
    if (!res.ok) {
        return []
    }
    return mapKeys(await res.json())
}

export const searchKeys = async (search) => {
    const res = await fetch(`/api/keys/${search}`, {
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

    const k = await fetch(`/api/key/${encodeURIComponent(key)}`, {
        method: "GET",
    }).then((resp) => resp.json())

    if (k.T === 5 && token !== null) {
        try {
            const kEnc = await fetch(
                `/api/key-enc/${encodeURIComponent(key)}`,
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
        await fetch(`/api/key/${encodeURIComponent(key)}`, {
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
    const tokenRes = await fetch(`/api/token`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            userName: userName,
            password,
        }),
    })
    if (!tokenRes.ok) {
        return {
            status: tokenRes.status,
            error: await tokenRes.text(),
            isLogged: false,
        }
    }
    const { token, user } = await tokenRes.json()

    return {
        token,
        ...user,
        isLogged: true,
    }
}

export const getUser = async (token, userName) => {
    if (token?.length === 0 || userName?.length === 0) {
        return {
            isLogged: false,
        }
    }
    const userRes = await fetch(`/api/user/${userName}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "application/json",
        },
    })
    if (!userRes.ok) {
        return {
            status: userRes.status,
            error: await userRes.text(),
            isLogged: false,
        }
    }
    return await userRes.json()
}

export const getUsers = async (token, usr) => {
    if (token?.length === 0) {
        return {
            isLogged: false,
        }
    }

    const uri = usr ? `/api/users?filter=${encodeURI(usr)}` : "/api/users"

    const respUsers = await fetch(uri, {
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

    const respUser = await fetch(`/api/user`, {
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

    const respUser = await fetch(`/api/user`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "application/json",
        },
        body: JSON.stringify(user),
    })
    if (!respUser.ok) {
        throw new Error(respUser.statusMessage)
    }
    return await respUser.json()
}

export const deleteUser = async (token, userName) => {
    if (token?.length === 0 || userName?.length === 0) {
        return {
            isLogged: false,
        }
    }

    const respDel = await fetch(`/api/user/${userName}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "application/json",
        },
    })

    if (!respDel.ok) {
        throw new Error(respDel.statusMessage)
    }
}

export const resetPassword = async (token, userName, password) => {
    if (token?.length === 0 || password?.length === 0) {
        throw new Error("Argumente required")
    }

    const res = await fetch(
        `/api/user/password/${encodeURIComponent(userName)}`,
        {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
                "X-PWD": `${password}`,
            },
        }
    )

    if (!res.ok) {
        return new Error(res.errorMessage)
    }

    return await res.text()
}
