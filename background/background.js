const filter = {
    urls: [
        "*://www.youtube.com/*"
    ],
};
const webRequestFlags = [
    "blocking",
];

function onError(error) {
    console.log(`Error: ${error}`);
}

function blockRequest(result) {
    function blockYt(page) {
        browser.storage.local.get("isVideoPlayerActive").then(res => {
            //media player is not enabled
            if (!res.isVideoPlayerActive) {
                return;
            }

            const instance = result.instanceVideoPlayer || "yewtu.be";
            return { cancel: page.url.includes("courses.ionisx.com") && !instance.includes("www.youtube.com") };
        });
    }

    browser.webRequest.onBeforeRequest.addListener(page => { return blockYt(page) },
        filter,
        webRequestFlags
    );
};

browser.storage.local.get("instanceVideoPlayer").then(result => {
    blockRequest(result);
});