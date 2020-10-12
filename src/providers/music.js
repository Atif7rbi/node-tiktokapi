const helper = require('../helper');
module.exports = {
    url: music => `${helper.apiBase}share/music/original-sound-${music}`,
    parse: (body) => {
        return {
            authorName: body.musicData.authorName,
            coverLarge: body.musicData.coversMedium[0],
            coverMedium: body.musicData.coversMedium[0],
            coverThumb: body.musicData.covers[0],
            id: body.musicData.musicId,
            original: body.musicData.original,
            playUrl: body.musicData.playUrl.UrlList[0],
            private: body.musicData.private,
            title: body.musicData.musicName,
            stats: {
                videoCount: body.musicData.posts,
            }
        };
    }
};