import * as t from "/global/browser-polyfill.js"
console.log("hello back")

const filter = {
    urls: [
        "*://www.youtube.com/*",
        "https://courses.ionisx.com/*"
    ],
};
const webRequestFlags = [
    "blocking",
];

function onError(error) {
    console.log(`Error: ${error}`);
}

// function blockRequest(result) {
//     function blockYt(page) {
//         browser.storage.local.get("isVideoPlayerActive").then(res => {
//             //media player is not enabled
//             if (!res.isVideoPlayerActive) {
//                 return;
//             }

//             const instance = result.instanceVideoPlayer || "yewtu.be";
//             return { cancel: page.url.includes("courses.ionisx.com") && !instance.includes("www.youtube.com") };
//         });
//     }

//     browser.webRequest.onBeforeRequest.addListener(page => { return blockYt(page) },
//         filter,
//         webRequestFlags
//     );
// };

function blockRequest2(result) {
    

    browser.webRequest.onBeforeRequest.addListener(page => {
        console.log(page)
        browser.storage.local.get("isVideoPlayerActive").then(res => {
            //media player is not enabled
            if (!res.isVideoPlayerActive) {
                return;
            }
            
            const instance = result.instanceVideoPlayer || "yewtu.be";
            if (page.url.includes("courses.ionisx.com") && !instance.includes("www.youtube.com")) {
                console.log("block")
                chrome.declarativeNetRequest.updateEnabledRulesets({"disableRulesetIds": "ruleset_1"})
            } else {
                chrome.declarativeNetRequest.updateEnabledRulesets({"enableRulesetIds": "ruleset_1"})
            }
        });
    }, filter);
}

browser.storage.local.get("instanceVideoPlayer").then(result => {
    blockRequest2(result);
});