import { getKey, saveKey } from "../../../lib/conkeys"
export default async function handler(req, res) {
    const { key } = req.query
    switch (req.method) {
        case "GET":
            const k = await getKey(key)
            res.status(200).json(k)
            break
        case "PUT":
            const { T, V } = req.body
            const token = req?.headers["authorization"]?.replace(
                /^Bearer\s/,
                ""
            )
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
