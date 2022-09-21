/*
* INIT
*/
//set placeholder
document.getElementById('instanceVideoPlayer').placeholder = `${DEFAULT_VIDEO_PLAYER} (default)`;

//make link clickable
for(let k = 0; k < document.getElementsByClassName("link").length; k++){
    document.getElementsByClassName("link")[k].addEventListener('click', function(e) {
        chrome.tabs.create({active: true, url: e.target.href});
    });
}

/*
* Get old state
*/
chrome.storage.local.get('instanceVideoPlayer', function(result){
    console.log(result)
    if(result['instanceVideoPlayer']){
        document.getElementById('instanceVideoPlayer').value = result['instanceVideoPlayer'];
    }
});

chrome.storage.local.get('URLDeadline', function(result){
    console.log(result)
    if(result['URLDeadline']){
        document.getElementById('URLDeadline').value = result['URLDeadline'];
    }
});

/*
* Set listener to set localStorage
*/
document.getElementById('instanceVideoPlayer').addEventListener('change', function(e){
    if(e.target.value == '') clearLocalStorage('instanceVideoPlayer');
    else addToLocalStorage('instanceVideoPlayer', e.target.value);
})

document.getElementById('URLDeadline').addEventListener('change', function(e){
    if(e.target.value == '') clearLocalStorage('URLDeadline');
    else addToLocalStorage('URLDeadline', e.target.value);
})

/*
* TOOLS
*/
function addToLocalStorage(nameKey, value){
    chrome.storage.local.set({[nameKey]: value}, function() {});//set local
}

function clearLocalStorage(nameKey){
    chrome.storage.local.remove(nameKey);
}