function updateDates(force = false) {
    return new Promise(function(resolve, reject) {
        const url = "";
        const today = new Date();
        chrome.storage.local.get('datesLastCheck', function(dateUp) {
            console.log(dateUp)
            console.log(dateUp.length==0)
            if (force ||
                Object.keys(dateUp).length == 0 ||
                createDate(dateUp.datesLastCheck) == "Invalid Date" ||
                createDate(dateUp.datesLastCheck).getDate() + 7 < today.getDate()) { //sync if last is one week old or doesn't exist
                fetch(url, {cache: "no-store"}).then(r => r.text()).then(result => {
                    console.log(result)
                    result = JSON.parse(result);
                    if (result) {
                        console.log("add")
                        addToLocalStorage('datesLastCheck', today.toLocaleDateString("fr-FR", {day: 'numeric', month: 'numeric'}));
                        chrome.storage.local.get('datesLastVersion', function(version) {
                            console.log(version)
                            console.log(result.version)
                            if (!version.datesLastVersion || result.version > version.datesLastVersion) {
                                console.log("update")
                                addToLocalStorage('datesLastVersion', result.version);
                                Object.keys(result.dates).forEach((elt) => {
                                    addToLocalStorage(elt.replaceAll('-', "_"), JSON.stringify(result.dates[elt]));
                                });
                                 resolve("Updated")
                            } else {
                                reject("Already on latest");
                            }
                        });
                    } else {
                        reject("fetch failed")
                    }
                });
            } else {
                resolve("no sync need")
            }
        });
    });
}

function createDate(dateStr) { // dd/mm
    const day = dateStr.split('/')[0];
    const month = dateStr.split('/')[1]+1;
    const year = new Date().getFullYear();
    return new Date(year, month, day);
}

function addToLocalStorage(nameKey, value) {
    chrome.storage.local.set({[nameKey]: value}, function() {});
}

function clearLocalStorage(nameKey) {
    chrome.storage.local.remove(nameKey);
}