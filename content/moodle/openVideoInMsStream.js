class OpenVideoInMsStream {
    constructor() {
      this.selector = "[data-title]";
      this.numberVideos = this.get_number();
      if (this.numberVideos != 0) {
        this.execute();
      }
    }

    get_number() {
      const activities = document.querySelectorAll(this.selector);
      const videos = [];
      for (let i = 0; i < activities.length; i++) {
        const title = activities[i].getAttribute("data-title")?.toLowerCase();
        if (title.contains("video") || title.contains("vidéo")) { // check for link and fetch in check for link to msstream
          videos.push(activities[i]);
        }
      }
      return videos.length;
    }
  
    update() {
      const numberOfEpineLink = document.getElementsByClassName(
        "epines-open-activity"
      ).length;
      const newnumberVideos = document.querySelectorAll(this.selector).length;
  
      if (
        newnumberVideos != this.numberVideos ||
        numberOfEpineLink != newnumberVideos
      ) {
        this.execute();
        this.numberVideos = document.querySelectorAll(this.selector).length;
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