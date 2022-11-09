"user strict";
{
  function setLandscapeMode() {
    if (window.matchMedia("(orientation: landscape)").matches) {
      document.body.classList.add("landscape");
    } else {
      document.body.classList.remove("landscape");
    }
  }
  window.addEventListener("load", () => {
    setLandscapeMode();
  });
  window.addEventListener("resize", () => {
    setLandscapeMode();
  });
}
