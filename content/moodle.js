function isMoodleUrl() {
    return url.substring(0, 23) == "https://moodle.epita.fr";
}

async function mainMoodle() {
    console.log("main moodle");
    
    if (url.substring(0, 35) == "https://moodle.epita.fr/mod/assign/")
        makeLinkClickableFeedback();

    if (url.substring(0, 30) == "https://moodle.epita.fr/course") {
        makeContentAfterLinkOptional();
        addLinkToOpenDocumentInNewTab();
        remove_activity_without_access();
    }

    const correctUrl = acceptedUrl(
        ["https://moodle.epita.fr/mod/folder/", "https://moodle.epita.fr/course"],
        url
    );
    if (correctUrl) openPdfInBrower();
}

function hide_option(element, text)
{
    const parent = element.parentNode;
    element.remove();
    const hide_container = document.createElement("div");
    hide_container.classList.add("epines-hide");
    hide_container.appendChild(element);
    parent.appendChild(hide_container);

    const info = document.createElement("div");
    info.classList.add("epines-clickable");
    info.textContent = text;
    parent.appendChild(info);

    info.addEventListener('click', (elt) => {
        elt.target.remove();
        hide_container.classList.remove("epines-hide");
    });
}

function remove_activity_without_access() {
    const activities = document.getElementsByClassName("activity-item");
    const to_remove = [];
    for (let i = 0; i < activities.length; i++)
    {
        if (!activities[i].getElementsByTagName("a").length)
        {
            to_remove.push(activities[i]);
        }
    }
    for (let i = 0; i < to_remove.length; i++)
    {
        hide_option(to_remove[i], `Reveal '${to_remove[i].getAttribute("data-activityname")}' (Hidden by epines, (lack of access))`);
    }
}

function addLinkToOpenDocumentInNewTab() {
    const selector = "[data-url]";
    let numberDocuments = document.querySelectorAll(selector).length;
    if (numberDocuments != 0) {
        addLinkToOpenDocumentInNewTabWhenCreated();
    }

    const observer = new MutationObserver((mutations) => {
        const newNumberDocuments = document.querySelectorAll(selector).length;
        const numberOfEpineLink = document.getElementsByClassName(
            "epines-open-activity"
        ).length;
        if (
            newNumberDocuments != numberDocuments ||
            numberOfEpineLink != newNumberDocuments
        ) {
            addLinkToOpenDocumentInNewTabWhenCreated();
            numberDocuments = document.querySelectorAll(selector).length;
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });
}

function addLinkToOpenDocumentInNewTabWhenCreated() {
    const link = document.createElement("a");
    link.target = "_blank";
    link.classList.add("epines-open-activity");
    link.style.whiteSpace = "nowrap";
    link.style.paddingRight = "20px";
    document.querySelectorAll(["[data-url]"]).forEach((elt) => {
        // link already here
        if (elt.getElementsByClassName("epines-open-activity").length != 0) return;

        const tmpLink = link.cloneNode();
        tmpLink.text = "Open in new tab";
        tmpLink.setAttribute("href", elt.getAttribute(["data-url"]));

        const activitiesBasis = elt.getElementsByClassName("activity-basis");
        if (activitiesBasis.length == 0) return;
        activitiesBasis[0].appendChild(tmpLink);
    });
}

function makeContentAfterLinkOptional() {
    const descriptions = document.getElementsByClassName("contentafterlink");
    for (let i = 0; i < descriptions.length; i++) {
        // ignore element too small (including label "trace available")
        if (descriptions[i].clientHeight < 60) {
            continue;
        }

        descriptions[i].classList.toggle("epines-hide");
        const div = document.createElement("div");
        div.classList.add("epines-line");
        const divTxt = document.createElement("div");
        divTxt.classList.add(
            isDarkReaderEnabled() ? "epines-line-txt-dark" : "epines-line-txt"
        );
        divTxt.textContent = "More informations";
        div.appendChild(divTxt);
        descriptions[i].parentElement.insertBefore(div, descriptions[i]);

        divTxt.addEventListener("click", () => {
            moodleSeeMore(div, descriptions[i]);
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
    let elt = document
        .getElementsByClassName("feedback")[0]
        ?.getElementsByClassName("plugincontentsummary")[0];
    if (elt) {
        elt.innerHTML = makeLinkClickable(elt.textContent);
    }
}

function openPdfInBrower() {
    let elt = document.getElementsByTagName("a");
    for (var i = 0; i < elt.length; i++) {
        let link = elt[i].href;
        const correctUrl = acceptedUrl(
            [
                "https://moodle.cri.epita.fr/mod/resource",
                "https://moodle.cri.epita.fr/pluginfile.php",
            ],
            elt[i].href
        );

        if (correctUrl) {
            if (link.includes("?forcedownload=1")) {
                let index = link.indexOf("?forcedownload=1");
                elt[i].href = link.slice(0, index);

                let l = elt[i].href.split(".");
                if (l[l.length - 1] == "pdf") elt[i].target = "_blank";
            }
        }
    }
}

function acceptedUrl(urlAccepted, url) {
    return urlAccepted.some((accepted) => url.includes(accepted));
}
