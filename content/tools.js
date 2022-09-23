function createCopyButton(elt) {
    const img = document.createElement("img");
    img.setAttribute("src", "https://www.svgrepo.com/show/86790/copy.svg");
    img.id = "epines-copyButton";
    elt.parentElement.style.display = "flex";
    elt.parentElement.style.alignItems = "center";
    elt.parentElement.appendChild(img)

    img.addEventListener("click", () => {
        copyText(elt.textContent);
    });
}

function copyText(value) {
    const textarea = document.createElement("textarea");
    textarea.textContent = value;
    textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in Edge
    document.body.appendChild(textarea);
    textarea.select();
    navigator.clipboard.writeText(textarea.textContent);
    textarea.remove();
}

const isDarkReaderEnabled = () => "querySelector" in document &&
    !!document.querySelector("meta[name=darkreader]");

const removeElements = (elms) => elms.forEach(el => el.remove());
  