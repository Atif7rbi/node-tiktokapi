const helper = require('../helper');
module.exports = {
    url: (id, type = 5, maxCursor = 0, minCursor = 0) => `${helper.apiBase}video/feed?secUid=&id=${id}&type=${type}&count=30&minCursor=${minCursor}&maxCursor=${maxCursor}&shareUid=&lang=en&verifyFp=`,
    parse: (body) => {
        return {
            statusCode: 0,
            items: helper.parseItems(body.itemListData),
            hasMore: body.hasMore,
            maxCursor: body.maxCursor,
            minCursor: body.minCursor,
        };

    }
};

