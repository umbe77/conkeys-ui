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
    return mapKeys(
        await fetch(`${conkeys_base_url}/api/keys`, {
            method: "GET",
        }).then((resp) => resp.json())
    )
}

export const searchKeys = async (search) => {
    if (search.length === 0) {
        return []
    }
    return mapKeys(
        await fetch(`${conkeys_base_url}/api/keys/${search}`, {
            method: "GET",
        }).then((resp) => resp.json())
    )
}

export const getKey = async (key) => {
    if (key?.length === 0) {
        return null
    }

    const k = await fetch(
        `${conkeys_base_url}/api/key/${encodeURIComponent(key)}`,
        {
            method: "GET",
        }
    ).then((resp) => resp.json())

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
