import { getKeys } from "../../../lib/conkeys"
import { removeEtag } from "../../../lib/http-utils"

export default async function handler(req, res) {
    removeEtag(res)
    if (req.method !== "GET") {
        res.status(405)
        res.end()
        return
    }

    const keys = await getKeys()

    res.status(200).json(keys)
}
