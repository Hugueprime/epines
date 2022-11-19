function isMoodleUrl() {
    console.log(url);
    return url.substring(0, 27) == "https://moodle.cri.epita.fr";
}

function mainMoodle() {
    console.log("in");
    if (url.substring(0, 39) == "https://moodle.cri.epita.fr/mod/assign/") {
        let elt = document.getElementsByClassName("feedback")[0]?.getElementsByClassName("plugincontentsummary")[0];
        console.log(elt)
        if (elt) {
            console.log(makeLinkClickable(elt.textContent));
            elt.innerHTML = makeLinkClickable(elt.textContent);
        }
    }
}

