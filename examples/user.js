const TikTok=require('../src');

(async () => {
    const tiktok = new TikTok();
    const data = await tiktok.getUser('tiktok');
    console.log(data);
})();
