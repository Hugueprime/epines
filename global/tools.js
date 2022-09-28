function updateDates(force = false) {
    return new Promise(function(resolve, reject) {
        const today = new Date();
        browser.storage.local.get('datesLastCheck', function(dateUp) {
            if (force ||
                Object.keys(dateUp).length == 0 ||
                createDate(dateUp.datesLastCheck) == "Invalid Date" ||
                createDate(dateUp.datesLastCheck).getDate() + 7 < today.getDate()
            ) { //sync if last is one week old or doesn't exist

                browser.storage.local.get('URLDeadline', function(url) {
                    if (url.URLDeadline) {
                        fetch(url.URLDeadline, {cache: "no-store"}).then(r => r.text()).then(result => {
                            result = JSON.parse(result);
                            if (result) {
                                addToLocalStorage('datesLastCheck', today.toLocaleDateString("fr-FR", {day: 'numeric', month: 'numeric'}));
                                browser.storage.local.get('datesLastVersion', function(version) {
                                    if (!version.datesLastVersion || result.version > version.datesLastVersion) {
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
                        reject("No url provided");
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
    browser.storage.local.set({[nameKey]: value}, function() {});
}

function clearLocalStorage(nameKey) {
    browser.storage.local.remove(nameKey);
}