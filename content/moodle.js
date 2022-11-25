function isMoodleUrl() {
    console.log(url);
    return url.substring(0, 27) == "https://moodle.cri.epita.fr";
}

function mainMoodle() {
    
    if (url.substring(0, 39) == "https://moodle.cri.epita.fr/mod/assign/") {
        makeLinkClickableFeedback();
    }
    
    if (url.substring(0, 34) == "https://moodle.cri.epita.fr/course") {
        makeContentAfterLinkOptional();
    }
}

function makeContentAfterLinkOptional() {
    let descriptions = document.getElementsByClassName("contentafterlink");
    for (let i = 0; i < descriptions.length; i++) {
        descriptions[i].classList.toggle("epines-hide");
        const div = document.createElement("div");
        div.classList.add("epines-line");
        const divTxt = document.createElement("div");
        divTxt.classList.add("epines-line-txt");
        divTxt.textContent = "More informations";
        div.appendChild(divTxt);
        descriptions[i].parentElement.insertBefore(div, descriptions[i]);
        
        divTxt.addEventListener("click", () => {
            moodleSeeMore(div, descriptions[i])
        });
    }
}

function moodleSeeMore(e, target) {
    if (target.classList.contains("epines-hide")) {
        e.firstChild.textContent = "Less";
    } else {
        e.firstChild.textContent = "More informations";
    }
    target.classList.toggle("epines-hide");
}

function makeLinkClickableFeedback() {
    let elt = document.getElementsByClassName("feedback")[0]?.getElementsByClassName("plugincontentsummary")[0];
    if (elt) {
        console.log(makeLinkClickable(elt.textContent));
        elt.innerHTML = makeLinkClickable(elt.textContent);
    }
}