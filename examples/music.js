const TikTok=require('../src');

(async () => {
    const tiktok = new TikTok();
    const data = await tiktok.getMusic('6798898508385585925');
    console.log(data);
})();
