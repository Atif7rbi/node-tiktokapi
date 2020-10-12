const helper = require('../helper');

module.exports =  {
    url: async url => {
        return new Promise(async (resolve, reject) => {
            try {
                if (/v\/([\d]+)/.exec(url)) {
                    let matchM = /v\/([\d]+)/.exec(url);
                    url = `https://www.tiktok.com/@tiktok/video/${matchM[1]}`;
                }
                if (/@([^\/]+)\/video\/([\d]+)/.exec(url) === null) {
                    url = await helper.finalUrl(url, {
                        headers: {
                            'User-Agent': helper.userAgent
                        }
                    });
                }
                const matches = /@([^\/]+)\/video\/([\d]+)/.exec(url);
                resolve(`https://www.tiktok.com/node/share/video/@${matches[1]}/${matches[2]}`);
            } catch (e) {
                reject(e);
            }
        });
    },
    parse:body=>helper.parseItems([body])[0],
};