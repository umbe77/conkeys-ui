import { getUsers } from "../../../lib/conkeys"
import { removeEtag } from "../../../lib/http-utils"

export default async function handler(req, res) {
    removeEtag(res)
    if (req.method !== "GET") {
        res.status(405)
        res.end()
        return
    }

    const token = req?.headers["authorization"]?.replace(/^Bearer\s/, "")
    const users = await getUsers(token, "")

    res.status(200).json(users)
}
