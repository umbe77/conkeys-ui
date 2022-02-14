import onHeaders from "on-headers"

export const removeEtag = (res) => {
    onHeaders(res, function () {
        this.removeHeader("ETag")
    })
}
