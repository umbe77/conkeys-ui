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
