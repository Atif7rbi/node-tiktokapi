const TikTok=require('../src');

(async () => {
    const tiktok = new TikTok();
    const data = await tiktok.getUserFeed('tiktok');
    console.log(data);
})();
