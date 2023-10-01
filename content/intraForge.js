function isIntraForgeUrl() {
  return url.substring(0, 28) == "https://intra.forge.epita.fr";
}

function mainIntraForge() {
  moveAssignementsOnTop();
  addCopyAnimationOnGitUrl();
}

function moveAssignementsOnTop() {
  const stack = document.getElementsByClassName("stack stack-reversed")[0];
  if (!stack) return;
  stack.classList.remove("stack-reversed");
}

function addCopyAnimationOnGitUrl() {
  const gitUrlElt = document.getElementsByClassName("gitUrl")[0];
  if (!gitUrlElt) return;
  gitUrlElt.lastElementChild.addEventListener("click", () => {
    copyAnimation(gitUrlElt);
  });
}
