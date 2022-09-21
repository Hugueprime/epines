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
    } else if(isInModuleUrl) {
        showSummaryOnHover();
    }
}

function reduceHeader() {
    document.getElementsByClassName("header-second-infos")[0].prepend(document.getElementsByClassName("cursus-header-title")[0])
}


function giveAccessToBlockedModules() {
    Array.prototype.forEach.call(document.getElementsByClassName("course-component-module-disabled"), function(element) {
        const ref = element.getElementsByClassName("course-component-body")[0].getAttribute("href");
        const title = element.getElementsByClassName("course-component-module-title")[0];
        title.innerHTML = `<a href=${ref}>${title.innerText}</a>`
    });
}

function showSummaryOnHover() {
    const summaryButton = document.getElementById('expand-collapse-outline-all-button');
    summaryButton.addEventListener('mouseover', function(e){
        mouseSummaryButton(e);
    });
    summaryButton.addEventListener('mouseout', function(e){
        mouseSummaryButton(e);
    });

    function mouseSummaryButton(e){
        const hoverSummary = document.getElementById("epines-hoverSummary");
        if(hoverSummary){
            if(!hoverSummary.classList.contains("epines-active") && e.type == "mouseover"){
                hoverSummary.classList.add("epines-active");
            }else if(hoverSummary.classList.contains("epines-active") && e.type == "mouseout"){
                hoverSummary.classList.remove("epines-active");
            }
        }else{
            const epinesClass = isDarkReaderEnabled ? "epines-dark" : "epines";
            const div = document.createElement('div');
            div.id = "epines-hoverSummary";
            div.classList.add("epines-active");
            div.classList.add(epinesClass)
            let summaryList = `<ol class="${epinesClass}">`;
            summaryButton.parentElement.append(div);
            
                fetchSummary().then(list => {
                    for(const k in list){
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
    function fetchSummary(){
        return new Promise(function(resolve, reject){
            const course = window.location.href.match(/https:\/\/courses\.ionisx\.com\/courses\/ref\/(m[0-9]{1,5})\//)[1];
            fetch(`https://courses.ionisx.com/courses/ref/${course}/x/course/`, {}).then(res => res.text()).then (res2 => {
                const res3 = res2.replace(/(\r\n|\n|\r)/gm," ");
                const response = [];
    
                if(/You must be enrolled in the course to see course content/.test(res3)){
                    response.push({
                        name: "It seems that your cookies have expired",
                        valid: false,
                        link: ""
                    })
                }else{
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
