class tilesController {
  constructor() {
    this.execute();
  }

  update() {
    this.execute();
  }

  execute() {
    const formatTilesOverlay = document.getElementById("format_tiles_overlay");
    if (formatTilesOverlay) {
      formatTilesOverlay.remove();
    }
  }
}
