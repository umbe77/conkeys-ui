import { getUser, addUser, saveUser } from "../../../lib/conkeys"
import { removeEtag } from "../../../lib/http-utils"
export default async function handler(req, res) {
    removeEtag(res)
    const { userName } = req.query
    const token = req?.headers["authorization"]?.replace(/^Bearer\s/, "")
    const method = req.method
    if (method === "GET") {
        const user = await getUser(token, userName)
        res.status(200).json(user)
        return
    }

    if (method === "POST" || method === "PUT") {
        const user = req.body
        method === "POST"
            ? await addUser(token, user)
            : await saveUser(token, user)
        res.status(200)
        res.end()
        return
    }
    res.status(405)
    res.end()
}
