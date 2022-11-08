function isDebugProUrl() {
    return url.substring(0, 24) == "http://www.debug-pro.com" ||
           url.substring(0, 20) == "http://debug-pro.com";
}

function mainDebugPro() {

    setDebugProCopyButton();

    addDebugProSummary();
    
}

function setDebugProCopyButton() {
    // Set copy button
    pre = document.getElementsByTagName('pre');
    for (let i = 0; i < pre.length; i++) {
        str = pre[i].children[0].textContent;
        if (str[0] == '$') { // Tests
            createCopyButton(pre[i].children[0], parseTest(str));
        }
        else { // Gived file
            createCopyButton(pre[i].children[0], str);
        }
    }
}

function parseTest(s) {
    s = s.split('\n');
    if (s[0] == "$ tree") {
        return parseTree(s)
    }
    result = ""
    for (let i = 0; i < s.length; i++) {
        if (s[i][0] == '$' && s[i][1] == ' ') {
            result += "echo \"" + s[i] + "\" && " + s[i].substring(2) + " && ";
        }
    }
    return result.substring(0, result.length - 3);
}

function getIndexFirstChar(s) {
    for (let j = 0; j < s.length; j++) {
        if (s[j].match(/[-_.A-Za-z0-9]/g)) return j;
    }
    return s.length;
}

function createFilePath(path, name) {
    if (path.length > 0) {
        return path.join("/") + "/" + name;
    }
    return name;
}

function parseTree(s) {
    let folders = []
    let files = []
    let previousIndexFirstChar = getIndexFirstChar(s[1]);
    let indexFirstChar = 1;
    let path = [];
    let name;
    for (let i = 2; i < s.length; i++) {
        indexFirstChar = getIndexFirstChar(s[i]);
        if (indexFirstChar < previousIndexFirstChar) {
            path.pop();
        }
        previousIndexFirstChar = indexFirstChar;

        name = s[i].substring(indexFirstChar, s[i].length);

        // ignore the authors file preventing the user to forgot to edit it
        if (name == "AUTHORS") continue;

        if (i + 1 < s.length) {
            // if the next line is longer this is a folders
            if (getIndexFirstChar(s[i+1]) > indexFirstChar) {
                folders.push(createFilePath(path, name))
                path.push(name)
            } else {
                files.push(createFilePath(path, name))
            }
        } else { // is last line
            // has extension
            if (s[i].includes(".")) {
                files.push(createFilePath(path, name))
            } else {
                folders.push(createFilePath(path, name));
                path.push(name)
            }
        }
    }

    return "mkdir " + folders.join(" ") + " && " +
            "touch " + files.join(" ") + " && " +
            "tree" + " && " + 'echo -e "\\033[0;31mWarning: the AUTHORS file has not been created ! \\033[0m"';
}

function addDebugProSummary()
{
    // check if summary is needed (403 or 404 or "site in construction message")
    if ((document.getElementsByTagName("h1").length > 0 &&
    (document.getElementsByTagName("h1")[0].textContent.includes("Error 404") ||
    document.getElementsByTagName("h1")[0].textContent.includes("Error 403"))) ||
    (document.getElementsByTagName("body").length > 0 &&
    document.getElementsByTagName("body")[0].children.length == 1 &&
    document.getElementsByTagName("body")[0].children[0].tagName == "TABLE"))
    {
        const list = document.createElement("ul");
        list.classList.add("epines-dark");
        list.id = "epines-debugProSummary";

        const sup = document.createElement("li");
        sup.textContent = "SUP";
        sup.classList.add("epines");
        const spe = document.createElement("li");
        spe.textContent = "SPE";
        spe.classList.add("epines");
        const supList = document.createElement("ul");
        const speList = document.createElement("ul");
        
        const separator = document.createElement("hr");
        separator.classList.add("epines");

        supList.appendChild(createLiA("Archi S1 (EN)", "http://www.debug-pro.com/epita/archi/s1/en"));
        // supList.appendChild(createLiA("Archi S2 (FR)", "http://www.debug-pro.com/epita/archi/s2/fr"));
        // supList.appendChild(createLiA("Archi S2 (EN)", "http://www.debug-pro.com/epita/archi/s2/en"));
        speList.appendChild(createLiA("Archi S3 (FR)", "http://www.debug-pro.com/epita/archi/s3/fr"));
        speList.appendChild(createLiA("Prog S3", "http://www.debug-pro.com/epita/prog/s3"));
        speList.appendChild(createLiA("Archi S3 (EN)", "http://www.debug-pro.com/epita/archi/s3/en"));
        // speList.appendChild(separator);
        // speList.appendChild(createLiA("Archi S4 (FR)", "http://www.debug-pro.com/epita/archi/s4/fr"));
        // speList.appendChild(createLiA("Prog S4", "http://www.debug-pro.com/epita/prog/s4"));
        // speList.appendChild(createLiA("Archi S4 (EN)", "http://www.debug-pro.com/epita/archi/s4/en"));

        sup.appendChild(supList);
        spe.appendChild(speList);
        list.appendChild(sup);
        list.appendChild(spe);
        // document.getElementsByTagName("body")[0].id = "epines-summary";
        document.getElementsByTagName("body")[0].prepend(list);
    }
}

function createLiA(name, link) {
    const li = document.createElement("li");
    li.classList.add("epines");
    const a = document.createElement("a");
    a.href = link;
    a.classList.add("epines");
    a.textContent = name;
    li.appendChild(a);
    return li;
}
