import { getUser, login } from "../../lib/conkeys"
import { removeEtag } from "../../lib/http-utils"

export default async function handler(req, res) {
    removeEtag(res)
    if (req.method !== "POST") {
        res.status(405)
        res.end()
        return
    }

    const { userName, password } = JSON.parse(req.body)

    const { token, isLogged } = await login(userName, password)
    if (isLogged) {
        const usr = await getUser(token, userName)
        res.status(200).json({
            ...usr,
            token,
            isLogged,
        })
        res.end()
    }

    res.status(401)
}
