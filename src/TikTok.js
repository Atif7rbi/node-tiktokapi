const rp = require('request-promise');
const providers = require('./providers');
const helper = require('./helper');
class TikTok {
    constructor(opt = {
        userAgent: helper.userAgent,
        cookieJar: () => rp.jar()
    }) {
        this.userAgent = opt.userAgent;
        this.cookieJar = opt.cookieJar();
    }
    async remote(url, headers = {}) {
        return new Promise(async (resolve, reject) => {
            rp({
                uri: url,
                method: 'GET',
                headers: {
                    'User-Agent': this.userAgent,
                    Referer: url,
                    'cache-control': 'no-cache',
                    'pragma': 'no-cache',
                    ...headers
                },
                jar: this.cookieJar,
                json: true,
            }).then(res => resolve(res)).catch(e => reject(e));

        });
    }
    async getUser(username) {
        return new Promise(async (resolve, reject) => {
            if (typeof username == "undefined") {
                return reject('Invalid Username');
            }
            console.log(providers.user.url(username));
            this.remote(providers.user.url(username)).then(data => {
                resolve(providers.user.parse(data.body));
            }).catch(e => reject(e));
        });
    }
    async getUserFeed(username, maxCursor = 0, minCursor = 0) {
        return new Promise(async (resolve, reject) => {
            this.getUser(username).then(user => {
                this.remote(providers.feed.url(user.id, helper.feedType.USER, maxCursor, minCursor)).then(data => {
                    resolve(providers.feed.parse(data.body));
                }).catch(e => reject(e));
            }).catch(e => reject(e));

        });
    }
    async getChallenge(challengeName) {
        return new Promise(async (resolve, reject) => {
            if (typeof challengeName == "undefined") {
                return reject('Invalid Challenge');
            }
            this.remote(providers.challenge.url(challengeName)).then(data => {
                resolve(providers.challenge.parse(data.body));
            }).catch(e => reject(e));
        });
    }

    async getChallengeFeed(challengeName, maxCursor = 0, minCursor = 0) {
        return new Promise(async (resolve, reject) => {

            this.getChallenge(challengeName).then(challenge => {
                this.remote(providers.feed.url(challenge.id, helper.feedType.CHALLENGE, maxCursor, minCursor)).then(data => {
                    resolve(providers.feed.parse(data.body));
                }).catch(e => reject(e));
            }).catch(e => reject(e));
        });
    }
    async getMusic(musicId) {
        return new Promise(async (resolve, reject) => {
            if (typeof musicId == "undefined") {
                return reject('Invalid Music');
            }
            this.remote(providers.music.url(musicId)).then(data => {
                resolve(providers.music.parse(data.body));
            }).catch(e => reject(e));
        });
    }

    async getMusicFeed(musicId, maxCursor = 0, minCursor = 0) {
        return new Promise(async (resolve, reject) => {
            this.getMusic(musicId).then(music => {
                this.remote(providers.feed.url(music.id, helper.feedType.MUSIC, maxCursor, minCursor)).then(data => {
                    resolve(providers.feed.parse(data.body));
                }).catch(e => reject(e));
            }).catch(e => reject(e));
        });
    }
    async getTrendingFeed() {
        return new Promise(async (resolve, reject) => {
            this.remote(providers.feed.url(1, helper.feedType.TRENDING, 1)).then(data => {
                resolve(providers.feed.parse(data.body));
            }).catch(e => reject(e));
        });
    }
    async getUrl(url) {
        return new Promise(async (resolve, reject) => {
            providers.url.url(url).then(endpoint => {
                this.remote(endpoint).then(data => {
                    resolve(providers.url.parse(data.body.videoData));
                }).catch(e => reject(e));
            }).catch(e => reject(e));
        });
    }
    async getNoWatermark(url) {
        return new Promise(async (resolve, reject) => {
            this.getUrl(url).then(video => {
                if (video.createTime > 1595980800) {
                    return reject('video posted after July 29, 2020');
                }
                this.remote(video.video.playAddr, {
                    Range: 'bytes=0-200000',
                    Referer: url
                }).then(async data => {
                    if (data.indexOf('vid:') > 0) {
                        const vid = (data.split("vid:")[1])
                            .substr(0, 32);
                        resolve({
                            id: vid,
                            url: await helper.finalUrl(`https://api-h2.tiktokv.com/aweme/v1/play/?video_id=${vid}&vr_type=0&is_play_url=1&source=PackSourceEnum_FEED&media_type=4&ratio=default&improve_bitrate=1`),
                            url_watermarked: video.video.playAddr
                        });
                    } else {
                        reject('no video id metadata found in video file');
                    }
                })
            }).catch(e => reject(e));

        });
    }
}

module.exports = TikTok;