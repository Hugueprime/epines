function createCopyButton(elt, s) {
  const img = document.createElement("img");
  img.setAttribute("src", "https://www.svgrepo.com/show/86790/copy.svg");
  img.id = "epines-copyButton";
  if (elt.parentElement.offsetHeight > 100) {
    img.classList.add("epines-buttonTopRight");
  }
  elt.parentElement.style.display = "flex";
  elt.parentElement.style.alignItems = "center";
  elt.parentElement.appendChild(img);
  elt.parentElement.style.position = "relative";
  img.addEventListener("click", () => {
    if (!s) s = elt.textContent;
    copyToClipboard(s);
    elt.style.opacity = "0.5";
    setTimeout(function () {
      elt.style.opacity = "1";
    }, 200);
  });
}

function copyAnimation(elt) {
  elt.style.opacity = "0.5";
  setTimeout(function () {
    elt.style.opacity = "1";
  }, 200);
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
      document.execCommand("copy") ? res() : rej();
      textArea.remove();
    });
  }
}

const isDarkReaderEnabled = () =>
  "querySelector" in document &&
  !!document.querySelector("meta[name=darkreader]");

const removeElements = (elms) => elms.forEach((el) => el.remove());

function makeLinkClickable(txt) {
  txt = txt.replaceAll(/http[s]?:\/\/(www\.)?(.*)?\/?(.)*/g, (match, key) => {
    return `<a target="_blank" href="${match}">${match}</a>`;
  });
  return txt;
}

function hide_option(element, text, customClass = "epines-default-hide") {
  if (element.childNodes.length == 0 || element.children.length == 0) return;
  element.classList.add(customClass);
  const parent = element.parentNode;
  element.remove();
  const hide_container = document.createElement("div");
  hide_container.classList.add("epines-hide");
  hide_container.appendChild(element);
  parent.appendChild(hide_container);

  const info = document.createElement("div");
  info.classList.add("epines-clickable");
  info.textContent = text;
  parent.appendChild(info);

  info.addEventListener("click", (elt) => {
    elt.target.remove();
    hide_container.classList.remove("epines-hide");
  });
}
