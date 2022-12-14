const DEFAULT_VIDEO_PLAYER = "yewtu.be";

/*
* INIT
*/
//set placeholder
document.getElementById('instanceVideoPlayer').placeholder = `${DEFAULT_VIDEO_PLAYER} (default)`;

//make link clickable
for(let k = 0; k < document.getElementsByClassName("link").length; k++){
    document.getElementsByClassName("link")[k].addEventListener('click', function(e) {
        browser.tabs.create({active: true, url: e.target.href});
    });
}

/*
* Get old state
*/
browser.storage.local.get('instanceVideoPlayer').then(result => {
    if(result['instanceVideoPlayer']){
        document.getElementById('instanceVideoPlayer').value = result['instanceVideoPlayer'];
    }
});

browser.storage.local.get('URLDeadline').then(result => {
    if(result['URLDeadline']){
        document.getElementById('URLDeadline').value = result['URLDeadline'];
    }
});

browser.storage.local.get('login').then(result => {
    if(result['login']){
        document.getElementById('login').value = result['login'];
    }
});

//dates
function updateDatesValues() {
    browser.storage.local.get('datesLastCheck').then(result => {
        if(result['datesLastCheck']){
            document.getElementById('datesLastCheck').innerText = `Last check: ${result['datesLastCheck']}`;
        }
    });
    
    browser.storage.local.get('datesLastVersion').then(result => {
        if(result['datesLastVersion']){
            document.getElementById('datesLastVersion').innerText = 'v'+result['datesLastVersion'];
        }
    });
}
updateDatesValues();

/*
* Set listener to set localStorage on input changes
*/
document.getElementById('instanceVideoPlayer').addEventListener('change', function(e) {
    if(e.target.value == '') clearLocalStorage('instanceVideoPlayer');
    else addToLocalStorage('instanceVideoPlayer', e.target.value);
});

document.getElementById('URLDeadline').addEventListener('change', function(e) {
    if(e.target.value == '') clearLocalStorage('URLDeadline');
    else if(e.target.value.match('https?:\/\/([a-zA-Z0-9]{1,61}\.)?[a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}')) {
        addToLocalStorage('URLDeadline', e.target.value);
    }
});

document.getElementById('login').addEventListener('change', function(e) {
    if(e.target.value == '') clearLocalStorage('login');
    else if(e.target.value.match('[a-z]+\.[a-z]+')) {
        addToLocalStorage('login', e.target.value);
    }
});

// listener to update changes in dates
const fetchButton = document.getElementById('datesFetch');
fetchButton.addEventListener('click', function(e) {
    fetchButton.disabled = true;
    fetchButton.innerText = "Fetching..."
    updateDates(true).then(() => {
        updateDatesValues();
        fetchButton.innerText = "Fetched"
        fetchButton.disabled = true;
    }).catch(rej => {
        fetchButton.innerText = rej;
        fetchButton.disabled = true;
    });
});
