const helper = require('../helper');

module.exports = {
    url: (username) => `${helper.apiBase}share/user/@${username}`,
    parse: (data) => {
        console.log(data);
        return {
            avatarLarger: data.userData.coversMedium[0],
            avatarMedium: data.userData.coversMedium[0],
            avatarThumb: data.userData.covers[0],
            id: data.userData.userId,
            nickname: data.userData.nickName,
            openFavorite: data.userData.openFavorite,
            relation: data.userData.relation,
            secUid: data.userData.secUid,
            secret: data.userData.isSecret,
            signature: data.userData.signature,
            uniqueId: data.userData.uniqueId,
            verified: data.userData.verified,
            stats: {
                diggCount: data.userData.digg,
                followerCount: data.userData.fans,
                followingCount: data.userData.following,
                heart: data.userData.heart,
                heartCount: data.userData.heart,
                videoCount: data.userData.video,
            }
        };
    }
};