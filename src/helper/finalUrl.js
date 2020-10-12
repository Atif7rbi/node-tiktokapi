module.exports = async (url, headers = {}) => {
    try {
        const head = await require('request-promise')
            .head(url, headers);
        if (head.location != url) {
            return head.location;
        }
    } catch (e) { }
    return url;
}