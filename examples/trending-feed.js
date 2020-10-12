const TikTok=require('../src');

(async () => {
    const tiktok = new TikTok();
    const trending = await tiktok.getTrendingFeed();
    console.log(trending);
})();
