function redirect(new_url) {
  window.location = new_url;
}

function bookmarks() {
  if (!document.title.includes("404")) {
    return;
  }
  browser.storage.local.get("bookmarks").then((res) => {
    if (!res.bookmarks.length) {
      return;
    }

    const list_bookmarks = JSON.parse(res.bookmarks);
    const bookmark = url.split("/")[3].toUpperCase();
    if (list_bookmarks[bookmark]) {
      redirect("course/view.php?id=" + list_bookmarks[bookmark]);
    } else {
      for (const key in list_bookmarks) {
        if (key.substring(0, 2) == bookmark.substring(0, 2)) {
          redirect("course/view.php?id=" + list_bookmarks[key]);
        }
      }
    }
  });
}
