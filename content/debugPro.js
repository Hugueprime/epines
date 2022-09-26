function isDebugProUrl() {
    return url.substring(0, 20) == 'http://debug-pro.com';
}

function mainDebugPro() {
    // Set copy button
    code = document.getElementsByTagName('code');
    for (let i = 0; i < code.length; i++) {
        if (code[i].textContent[0] == '$') { // Tests
            createCopyButton(code[i], parseTest(code[i].textContent));
        }
        else { // Gived file
            createCopyButton(code[i], code[i].textContent);
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
