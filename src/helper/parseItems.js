module.exports = (items) => {
    let final = [];
    items.forEach(item => {
        const video = item.itemInfos;
        const author = item.authorInfos;
        const music = item.musicInfos;
        final.push({
            "id": video.id,
            "desc": video.text,
            "createTime": parseInt(video.createTime),
            "video": {
                "id": "awesome",
                "height": item.itemInfos.video.videoMeta.height,
                "width": item.itemInfos.video.videoMeta.width,
                "duration": item.itemInfos.video.videoMeta.duration,
                "ratio": '720p',
                "cover": typeof video.covers != "undefined" ? video.covers[0] : '',
                "originCover": typeof video.coversOrigin != "undefined" ? video.coversOrigin[0] : '',
                "dynamicCover": typeof video.coversDynamic != "undefined" ? video.coversDynamic[0] : '',
                "playAddr": typeof video.video.urls != "undefined" ? video.video.urls[0] : '',
                "downloadAddr": typeof video.video.urls != "undefined" ? video.video.urls[0] : '',
            },
            "author": {
                "id": author.userId,
                "uniqueId": author.uniqueId,
                "nickname": author.nickName,
                "avatarThumb": typeof author.covers != "undefined" ? author.covers[0] : '',
                "avatarMedium": typeof author.coversMedium != "undefined" ? author.coversMedium[0] : '',
                "avatarLarger": typeof author.coversLarger != "undefined" ? author.coversLarger[0] : '',
                "signature": author.signature,
                "verified": author.verified,
                "secUid": author.secUid
            },
            "music": {
                "id": music.musicId,
                "title": music.musicName,
                "playUrl": typeof music.playUrl != "undefined" ? music.playUrl[0] : "",
                "coverThumb": typeof music.covers != "undefined" ? music.covers[0] : "",
                "coverMedium": typeof music.coversMedium != "undefined" ? music.coversMedium[0] : "",
                "coverLarge": typeof music.coversLarger != "undefined" ? music.coversLarger[0] : "",
                "authorName": music.authorName,
                "original": music.original
            },
            "stats": {
                "diggCount": video.diggCount,
                "shareCount": video.shareCount,
                "commentCount": video.commentCount,
                "playCount": video.playCount
            },
            "originalItem": video.isOriginal,
            "officalItem": video.isOfficial,
            "digged": video.liked,
            "itemCommentStatus": video.commentStatus,
            "showNotPass": video.showNotPass,
            "vl1": false
        });
    });
    return final;
}