const helper = require('../helper');
module.exports = {
    url: (challenge) => `${helper.apiBase}share/tag/${challenge}`,
    parse: (body) => {
        return {
            coverLarger: body.challengeData.coversMedium[0],
            coverMedium: body.challengeData.coversMedium[0],
            coverThumb: body.challengeData.covers[0],
            desc: body.challengeData.text,
            id: body.challengeData.challengeId,
            isCommerce: body.challengeData.isCommerce,
            profileLarger: body.challengeData.coversMedium[0],
            profileMedium: body.challengeData.coversMedium[0],
            profileThumb: body.challengeData.covers[0],
            title: body.challengeData.challengeName,
            stats: {
                videoCount: body.challengeData.posts,
                viewCount: body.challengeData.views,
            }
        };
    }
};