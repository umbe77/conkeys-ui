import { getKey, saveKey } from "../../../lib/conkeys"
import { removeEtag } from "../../../lib/http-utils"
export default async function handler(req, res) {
    removeEtag(res)
    const { key } = req.query
    const token = req?.headers["authorization"]?.replace(/^Bearer\s/, "")
    switch (req.method) {
        case "GET":
            const k = await getKey(key, token)
            res.status(200).json(k)
            break
        case "PUT":
            const { T, V } = req.body
            await saveKey(token, { key, T, V })
            res.status(200)
            res.end()
            break
        default:
            res.status(405)
            res.end()
            return
    }
}
