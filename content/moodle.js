function isMoodleUrl() {
    return url.substring(0, 27) == "https://moodle.cri.epita.fr";
}

function mainMoodle() {
    if (url.substring(0, 39) == "https://moodle.cri.epita.fr/mod/assign/")
        makeLinkClickableFeedback();
    
    if (url.substring(0, 34) == "https://moodle.cri.epita.fr/course")
        makeContentAfterLinkOptional();

    const correctUrl = acceptedUrl(["https://moodle.cri.epita.fr/mod/folder/","https://moodle.cri.epita.fr/course"], url);
    if (correctUrl)
        openPdfInBrower();
}

function makeContentAfterLinkOptional() {
    let descriptions = document.getElementsByClassName("contentafterlink");
    for (let i = 0; i < descriptions.length; i++) {
        // ignore element too small (including label "trace available")
        if(descriptions[i].clientHeight < 60) {
            continue;
        }

        descriptions[i].classList.toggle("epines-hide");
        const div = document.createElement("div");
        div.classList.add("epines-line");
        const divTxt = document.createElement("div");
        divTxt.classList.add(isDarkReaderEnabled() ? "epines-line-txt-dark" : "epines-line-txt");
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
        elt.innerHTML = makeLinkClickable(elt.textContent);
    }
}

function openPdfInBrower() {
    let elt = document.getElementsByTagName("a"); 
    for(var i = 0; i< elt.length; i++) {
        let link = elt[i].href;
        const correctUrl = acceptedUrl(["https://moodle.cri.epita.fr/mod/resource", "https://moodle.cri.epita.fr/pluginfile.php"], elt[i].href);
        
        if (correctUrl)
        {
            if (link.includes("?forcedownload=1"))
            {
                let index = link.indexOf("?forcedownload=1"); 
                elt[i].href = link.slice(0,index);
                
                let l = elt[i].href.split("."); 
                if (l[l.length - 1] == "pdf")
                    elt[i].target = "_blank";
            }
        }
    }
}

function acceptedUrl(urlAccepted, url) {
    return urlAccepted.some(accepted => url.includes(accepted));
}