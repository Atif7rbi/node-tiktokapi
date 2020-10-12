const TikTok=require('../src');

(async () => {
    const tiktok = new TikTok();
    const data = await tiktok.getUrl('https://www.tiktok.com/@zachking/video/6829303572832750853');
    console.log(data);
})();
