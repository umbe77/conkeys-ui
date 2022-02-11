import { getUser, login } from "../../lib/conkeys"

export default async function handler(req, res) {
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
