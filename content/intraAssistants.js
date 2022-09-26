function isIntraAssistantUrl() {
    return url.substring(0, 33) == 'https://intra.assistants.epita.fr';
}

function mainIntraAssistant() {
    const urlParts = url.split('/').filter(e => e !== '');
    if (urlParts.length == 5 && urlParts[2] == 'activities') {
        // https://intra.assistants.epita.fr/activities/2022-asm-s0-tp00/2022-asm-s0-tp00-john.smith
        moveAssignementsOnTop();
        copyButtonForGitUrl();
    }
}

function moveAssignementsOnTop() {
    const assignements = document.getElementsByClassName("stack stack-reversed")[0].children[0];
    const assignementsClone = assignements.cloneNode(true);
    const topStack = document.getElementsByClassName("stack top-stack")[0];
    topStack.insertBefore(assignementsClone, topStack.children[1]);
    assignements.remove();
}

function copyButtonForGitUrl() {
    const gitUrlElt = document.getElementsByClassName('gitUrl')[0];
    createCopyButton(gitUrlElt, elt.textContent);
}

