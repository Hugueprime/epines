function createCopyButton(elt, s) {
    const img = document.createElement("img");
    img.setAttribute("src", "https://www.svgrepo.com/show/86790/copy.svg");
    img.id = "epines-copyButton";
    elt.parentElement.style.display = "flex";
    elt.parentElement.style.alignItems = "center";
    elt.parentElement.appendChild(img)

    img.addEventListener("click", () => {
        copyToClipboard(s);
    });
}

// return a promise
function copyToClipboard(textToCopy) {
    // navigator clipboard api needs a secure context (https)
    if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard api method'
        return navigator.clipboard.writeText(textToCopy);
    } else {
        // text area method
        let textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        // make the textarea out of viewport
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise((res, rej) => {
            // here the magic happens
            document.execCommand('copy') ? res() : rej();
            textArea.remove();
        });
    }
}

const isDarkReaderEnabled = () => "querySelector" in document &&
    !!document.querySelector("meta[name=darkreader]");

const removeElements = (elms) => elms.forEach(el => el.remove());
  
