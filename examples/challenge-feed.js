const TikTok=require('../src');

(async () => {
    const tiktok = new TikTok();
    const data = await tiktok.getChallengeFeed('putafaceon');
    console.log(data);
})();
