import { searchKeys } from "../../../lib/conkeys"
import { removeEtag } from "../../../lib/http-utils"
export default async function handler(req, res) {
    removeEtag(res)
    if (req.method !== "GET") {
        res.status(405)
        res.end()
        return
    }

    const { search } = req.query
    const keys = await searchKeys(search)

    res.status(200).json(keys)
}
