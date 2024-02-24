function updateDates(force = false) {
    return new Promise(function(resolve, reject) {
        const today = new Date();
        browser.storage.local.get('datesLastCheck').then(dateUp => {
            if (force ||
                Object.keys(dateUp).length == 0 ||
                createDate(dateUp.datesLastCheck) == "Invalid Date" ||
                createDate(dateUp.datesLastCheck).getDate() + 7 < today.getDate()
            ) { //sync if last is one week old or doesn't exist
                browser.storage.local.get('URLDeadline').then(url => {
                    if (url.URLDeadline) {
                        fetch(url.URLDeadline, {cache: "no-store"}).then(r => r.text()).then(result => {
                            result = JSON.parse(result);
                            if (result) {
                                addToLocalStorage('datesLastCheck', today.toLocaleDateString("fr-FR", {day: 'numeric', month: 'numeric'}));
                                browser.storage.local.get('datesLastVersion').then(version => {
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
                                reject("Fetch failed")
                            }
                        }).catch(() => {
                            reject("Failed to request")                
                        });
                    } else {
                        reject("No url provided");
                    }
                });
            } else {
                resolve("No sync need")
            }
        });
    });
}

function updateRedirect(force = false) {
    return new Promise(function(resolve, reject) {
        const today = new Date();
        browser.storage.local.get('redirectLastCheck').then(dateUp => {
            if (force ||
                Object.keys(dateUp).length == 0 ||
                createDate(dateUp.redirectLastCheck) == "Invalid Date" ||
                createDate(dateUp.redirectLastCheck).getDate() + 7 < today.getDate()
            ) { //sync if last is one week old or doesn't exist
                browser.storage.local.get('URLRedirect').then(url => {
                    if (!url.URLRedirect)
                        url.URLRedirect = DEFAULT_BOOKMARKS;
                    fetch(url.URLRedirect, {cache: "no-cache"}).then(r => r.text()).then(result => {
                        result = JSON.parse(result);
                        if (result) {
                            addToLocalStorage('redirectLastCheck', today.toLocaleDateString("fr-FR", {day: 'numeric', month: 'numeric'}));
                            browser.storage.local.get('redirectLastVersion').then(version => {
                                if (!version.redirectLastVersion || result.version > version.redirectLastVersion) {
                                    addToLocalStorage('redirectLastVersion', result.version);
                                    clearLocalStorage("bookmarks");
                                    addToLocalStorage("bookmarks", JSON.stringify(result.bookmarks));
                                    resolve("Updated")
                                } else {
                                    reject("Already on latest");
                                }
                            });
                        } else {
                            reject("Fetch failed")
                        }
                    }).catch(() => {
                        reject("Failed to request")                
                    });
                    
                });
            } else {
                resolve("No sync need")
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
    browser.storage.local.set({[nameKey]: value});
}

function clearLocalStorage(nameKey) {
    browser.storage.local.remove(nameKey);
}

function capitalizeFLetter(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }