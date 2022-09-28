function isDebugProUrl() {
    return url.substring(0, 24) == "http://www.debug-pro.com" ||
           url.substring(0, 20) == "http://debug-pro.com";
}

function mainDebugPro() {
    console.log("okkk");
    // Set copy button
    pre = document.getElementsByTagName('pre');
    for (let i = 0; i < pre.length; i++) {
        console.log(pre);
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
    result = ""
    for (let i = 0; i < s.length; i++) {
        if (s[i][0] == '$' && s[i][1] == ' ') {
            result += "echo \"" + s[i].substring(2) + "\" && " + s[i].substring(2) + " && ";
        }
    }

    return result.substring(0, result.length - 3);
}
