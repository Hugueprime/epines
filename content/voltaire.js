function isVoltaireUrl() {
    return url.substring(0, 30) == "https://www.projet-voltaire.fr";
}

function mainVoltaire() {
    console.log("main")

    changeButtonOrder();
    waitToEnterInLevel();
}

function waitToEnterInLevel() {
    const levels = document.getElementsByClassName("activity-selector-cell");
    for (let i = 0; i < levels.length; i++) {
        console.log(levels[i])
        levels[i].addEventListener("click", () => {
            console.log("click", i)
            changeButtonOrder();
        });
    }
}

function changeButtonOrder() {
    const noMistake = document.getElementsByClassName("noMistakeButton");
    console.log(noMistake)
    if (noMistake.length == 1 ) {
        noMistake[0].addEventListener("click", () => {
            console.log("click o")
            const elts = document.getElementsByClassName("pointAndClick");
            if (elts.length == 1) {
                elts[0].insertBefore(elts[0].lastChild, elts[0].children[1]);
            }
            document.getElementsByClassName("nextButton")[0].addEventListener("click", () => {
                changeButtonOrder();
            });
        });
    }
}