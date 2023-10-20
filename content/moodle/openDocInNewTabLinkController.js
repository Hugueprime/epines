class openDocInNewTabLinkController {
  constructor() {
    this.selector = "[data-url]";
    this.numberDocuments = document.querySelectorAll(this.selector).length;
    if (this.numberDocuments != 0) {
      this.execute();
    }
  }

  update() {
    const numberOfEpineLink = document.getElementsByClassName(
      "epines-open-activity"
    ).length;
    const newNumberDocuments = document.querySelectorAll(this.selector).length;

    if (
      newNumberDocuments != this.numberDocuments ||
      numberOfEpineLink != newNumberDocuments
    ) {
      this.execute();
      this.numberDocuments = document.querySelectorAll(this.selector).length;
    }
  }

  execute() {
    const link = document.createElement("a");
    link.target = "_blank";
    link.classList.add("epines-open-activity");
    link.style.whiteSpace = "nowrap";
    link.style.paddingRight = "20px";
    document.querySelectorAll(["[data-url]"]).forEach((elt) => {
      // link already here
      if (elt.getElementsByClassName("epines-open-activity").length != 0)
        return;

      const tmpLink = link.cloneNode();
      tmpLink.text = "Open in new tab";
      tmpLink.setAttribute("href", elt.getAttribute(["data-url"]));

      const activitiesBasis = elt.getElementsByClassName("activity-basis");
      if (activitiesBasis.length == 0) return;
      activitiesBasis[0].appendChild(tmpLink);
    });
  }
}
