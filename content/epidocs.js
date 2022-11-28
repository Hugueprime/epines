function isEpidocsUrl() {
    return url.includes("https://past-exams.epidocs.eu");
}

const CORRECTION_TAG = "@correction_epidocs";

function mainEpidocs() {
    addCorrectionLinkToStorage(); 

    if (url.includes(".pdf"))
        addButtonToPdfViewer();
}

function addCorrectionLinkToStorage() {
    let value = JSON.parse(localStorage.getItem(CORRECTION_TAG));
    if (value == null)
        value = [];
    
    let elt = document.getElementsByTagName("a"); 
    for(var i = 0; i < elt.length; i++) {
        let link = elt[i].href;
        if (link.includes("correction"))
        {
            if (!value.includes(link))
                value.push(link);
        }

        let l = link.split("."); 
        if (l[l.length - 1] == "pdf")
            elt[i].target = "_blank";
    }
    
    
    localStorage.setItem(CORRECTION_TAG, JSON.stringify(value));
}

function addButtonToPdfViewer() {
    let new_elt = document.createElement("div");
    new_elt.style.backgroundColor = "#eeeee4";
    new_elt.style.padding = "1rem 3rem";
    
    let qcmurl = url.split(".pdf")[0];
    let n_qcm = qcmurl.split("-")[qcmurl.split("-").length - 1]; 
    let year_qcm = url.split("/")[url.split("-").length];
    
    let value = getLocalStorage();
    let correctionurl = value.find(url => {
        return url.split("-")[url.split("-").length - 2] == n_qcm
            && url.split("/")[url.split("/").length - 2] == year_qcm
    });

    let p = document.createElement("p");
    let a = document.createElement("a");
    a.innerHTML = correctionurl;
    a.href = correctionurl;
    p.innerHTML = "Correction du QCM: ";
    p.appendChild(a); 
    p.style.margin = 0;
    new_elt.appendChild(p);

    document.body.children[0].appendChild(new_elt);
    document.body.getElementsByTagName("header")[0].style.position = "relative";
}


function getLocalStorage() {
    let value = JSON.parse(localStorage.getItem(CORRECTION_TAG));
    if (value == null)
        value = [];

    return value;
}
