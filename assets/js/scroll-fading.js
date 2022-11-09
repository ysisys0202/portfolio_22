"use strict";
{
  const fadingItems = document.querySelectorAll(".fading-item");
  function activateFading(item) {
    if (item.classList.contains("is-fading")) {
      return;
    }
    item.classList.add("is-fading");
  }
  function inactivateFading(item) {
    if (!item.classList.contains("is-fading")) {
      return;
    }
    item.classList.remove("is-fading");
  }

  function animateFading(item) {
    if (item.classList.contains("fading-vertical")) {
      const itemVerticalPos = item.getBoundingClientRect().top + pageYOffset;
      const verticalActivePos = pageYOffset + (window.innerHeight * 2) / 3;
      if (itemVerticalPos < verticalActivePos) {
        activateFading(item);
      } else {
        inactivateFading(item);
      }
    }
    if (item.classList.contains("fading-horizontal")) {
      const itemHorizontalPos = item.getBoundingClientRect().left;
      const hrizontalActivePos = (window.innerWidth * 4) / 5;
      if (itemHorizontalPos < hrizontalActivePos) {
        activateFading(item);
      } else {
        inactivateFading(item);
      }
    }
  }

  function fadingScrollHandler() {
    fadingItems.forEach((fadingItem) => {
      animateFading(fadingItem);
    });
  }
  window.addEventListener("scroll", fadingScrollHandler);
}
