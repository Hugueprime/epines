const DEFAULT_INSTANCE = "yewtu.be";

function isIonisxUrl() {
    return url.substring(0, 18) === 'https://ionisx.com' ||
    url.substring(0, 26) === 'https://courses.ionisx.com';
}

function isModuleListUrl() {
    const moduleListUrl = new RegExp(/https:\/\/ionisx\.com\/courses\/[a-z0-9]{24}/);
    return moduleListUrl.test(url);
}

function isInModuleUrl() {
    const moduleUrl = new RegExp(/https:\/\/courses\.ionisx\.com\/courses\/ref/);
	return moduleUrl.test(url);
}

function mainIonisx() {
    if (isModuleListUrl()) {
        reduceHeader();
        giveAccessToBlockedModules();
        chrome.storage.local.get("datesActive", function(res) {
            if (res.datesActive) {
                showDates();
            }
        });
    } else if (isInModuleUrl) {
        showSummaryOnHover();
        chrome.storage.local.get("isVideoPlayerActive", function(res) {
            if (res.isVideoPlayerActive) {
                changeInstanceMediaPlayer();
            }
        });
    }
}

function reduceHeader() {
    document.getElementsByClassName("header-second-infos")[0].prepend(document.getElementsByClassName("cursus-header-title")[0])
}


function giveAccessToBlockedModules() {
    Array.prototype.forEach.call(document.getElementsByClassName("course-component-module-disabled"), function(element) {
        const ref = element.getElementsByClassName("course-component-body")[0].getAttribute("href");
        const title = element.getElementsByClassName("course-component-module-title")[0];
        title.innerHTML = `<a href=${ref}>${title.innerText}</a>`;
    });
}

function showSummaryOnHover() {
    const summaryButton = document.getElementById('expand-collapse-outline-all-button');
    if (!summaryButton) {
        return;
    }

    summaryButton.addEventListener('mouseover', function(e) {
        mouseSummaryButton(e);
    });
    summaryButton.addEventListener('mouseout', function(e) {
        mouseSummaryButton(e);
    });

    function mouseSummaryButton(e) {
        const hoverSummary = document.getElementById("epines-hoverSummary");
        if (hoverSummary) {
            if (!hoverSummary.classList.contains("epines-active") && e.type == "mouseover") {
                hoverSummary.classList.add("epines-active");
            } else if (hoverSummary.classList.contains("epines-active") && e.type == "mouseout") {
                hoverSummary.classList.remove("epines-active");
            }
        } else {
            const epinesClass = isDarkReaderEnabled() ? "epines-dark" : "epines";
            const div = document.createElement('div');
            div.id = "epines-hoverSummary";
            div.classList.add("epines-active");
            div.classList.add(epinesClass)
            let summaryList = `<ol class="${epinesClass}">`;
            summaryButton.parentElement.append(div);
            
                fetchSummary().then(list => {
                    for(const k in list) {
                        let valid = '<span class="fa-uncheck"></span>'
                        if (list[k].valid) valid = '<span class="fa fa-check"></span>';
                        summaryList += `<li class="${epinesClass}"><a href="${list[k].link}">${list[k].name}</a>${valid}</li>`;
                    }
                    summaryList += "</ol>";
                    div.innerHTML = summaryList;
                });
        }
    }
    
    
    //fetch summary and getting title, links and complete mark
    function fetchSummary() {
        return new Promise(function(resolve, reject) {
            const course = window.location.href.match(/https:\/\/courses\.ionisx\.com\/courses\/ref\/(m[0-9]{1,5})\//)[1];
            fetch(`https://courses.ionisx.com/courses/ref/${course}/x/course/`, {}).then(res => res.text()).then (res2 => {
                const res3 = res2.replace(/(\r\n|\n|\r)/gm," ");
                const response = [];
    
                if (/You must be enrolled in the course to see course content/.test(res3)) {
                    response.push({
                        name: "It seems that your cookies have expired",
                        valid: false,
                        link: ""
                    });
                } else {
                    const titleRegex = /<h4 class="subsection-title">[\s]*(.*?)[\s]*<\/h4>.*?(<span class="complete-checkmark fa fa-check"><\/span>|div).*?(https:\/\/courses\.ionisx\.com\/courses[a-z0-9\/_:]*)/g
            
                    const datas = [...res3.matchAll(titleRegex)];
                    datas.forEach(elt => {
                            response.push({
                            name: elt[1].replace("&#39;", "'"),
                            valid: (elt[2] == "div" ? false : true),
                            link:elt[3].replace("&#39;", "'")
                            });
                    });
                }
    
                resolve(response);
            });
        });
    }
}

function changeInstanceMediaPlayer() {
    function changeMediaPlayer(instance, iframes) {
        for (let el of iframes) {
            try {
                const video = el.src;
    
                if (video.includes("www.youtube.com")) {
                    const newvideo = video.substring(0, video.indexOf('?')).replace("www.youtube.com", instance) || video.replace("www.youtube.com", instance);
                    el.src = newvideo;
    
                    const size = el.scrollWidth;
                    el.width = size;
                    el.height = size / 16 * 9;
                }
            } catch (e) {
                console.log(e);
            }
        }
    
        removeElements(document.querySelectorAll(".video-controls"));
        removeElements(document.querySelectorAll(".spinner"));
    }
    
    function waitForIFrame(n, instance) {
        window.setTimeout(function () {
            const elements = document.getElementsByTagName("iframe");
    
            if (elements.length != 0) {
                changeMediaPlayer(instance, elements);
            } else if (n <= 4) {
                waitForIFrame(n + 1, instance);
            }
        }, 250)
    }

    chrome.storage.local.get("instanceVideoPlayer", function(result) {
        const instance = result.instanceVideoPlayer ?? DEFAULT_INSTANCE;
        waitForIFrame(0, instance);
    });
}

function showDates() {
    updateDates().then(() => {
        console.log("dates")
	    const options = { month: 'short', day: 'numeric'};
        const coursesList = window.location.href.match(/https:\/\/ionisx\.com\/courses\/[a-z0-9]{24}\/([a-z0-9\-]*)/)[1].replaceAll('-', '_');

        chrome.storage.local.get([coursesList], function(dates) {
            console.log(dates)
            if (Object.keys(dates).length == 0) {
                return;
            }
            dates = dates[coursesList];
            dates = JSON.parse(dates);
            console.log(dates)
            for(const k in dates) {
                const module = document.getElementsByClassName("module-number")[k].parentElement;
                const span = document.createElement("span");
                span.classList.add("epines-dateToDo");

                const dateStart = new Date(dates[k].start);
                const dateEnd = new Date(dates[k].end);
                span.innerHTML = `${dateStart.toLocaleDateString('fr-FR', options)} to ${dateEnd.toLocaleDateString('fr-FR', options)}`;

                const today = new Date;
                if (module.parentElement.parentElement.classList.contains("course-component-module-finished")) { //done
                    span.classList.add("epines-DoneWeek");
                } else {
                    if (today.getTime() > dateEnd.getTime()) { //past week
                        span.classList.add("epines-PastWeek");
                    } else if (dateStart.getTime() < today.getTime() && today.getTime() < dateEnd.getTime()) { //current week
                        span.classList.add("epines-ActualWeek");
                    } else {
                        today.setDate(today.getDate() + 7);//next week
                        if (dateStart.getTime() < today.getTime() && today.getTime() < dateEnd.getTime()) {//next week
                            span.classList.add("epines-NextWeek");
                        } else { //futur week
                            span.classList.add("epines-FuturWeek");
                        }
                    }
                }
                module.appendChild(span);
            }
        });
    });

    //create legend
    const div = document.createElement('div');
    div.id = "epines-legend";
    div.classList.add("course-progress-block")
    const name = ['Late', 'To do this week', 'Finished', 'To do next week', 'To do some time in the futur'];
    const classDate = ['epines-PastWeek', 'epines-ActualWeek', 'epines-DoneWeek', 'epines-NextWeek', 'epines-FuturWeek'];
    for (let i = 0; i < name.length; i++) {
        const elt = document.createElement('label');
        elt.innerText = name[i];
        elt.classList.add(classDate[i])
        div.appendChild(elt)
    }

    const elt = document.getElementsByClassName("course-timeline-aside")[0].firstChild;
    elt.insertBefore(div, elt.children[2]);
}