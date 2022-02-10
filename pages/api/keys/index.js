import { getKeys } from "../../../lib/conkeys"

export default async function handler(req, res) {
    if (req.method !== "GET") {
        res.status(405)
        res.end()
        return
    }

    const keys = await getKeys()

    res.status(200).json(keys)
}
