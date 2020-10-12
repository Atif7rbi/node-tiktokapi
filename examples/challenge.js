const TikTok=require('../src');

(async () => {
    const tiktok = new TikTok();
    const data = await tiktok.getChallenge('putafaceon');
    console.log(data);
})();
