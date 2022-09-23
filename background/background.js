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
        chrome.storage.local.get("isVideoPlayerActive", function(res){
            //media player is not enabled
            if (!res.isVideoPlayerActive) {
                return;
            }

            const instance = result.instanceVideoPlayer || "yewtu.be";
            return { cancel: page.url.includes("courses.ionisx.com") && !instance.includes("www.youtube.com") };
        });
    }

    chrome.webRequest.onBeforeRequest.addListener(page => { return blockYt(page) },
        filter,
        webRequestFlags
    );
};

chrome.storage.local.get("instanceVideoPlayer", function(result){
    blockRequest(result);
});