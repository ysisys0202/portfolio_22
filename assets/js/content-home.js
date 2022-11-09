"use strict";
{
  //title effect
  const titles = document.querySelectorAll(".text-line");

  titles.forEach((title, i) => {
    const titleLetters = title.textContent.replace(/(\s*)/g, "").split("");
    const spanItems = [];
    title.textContent = "";
    for (let i = 0; i < titleLetters.length; i++) {
      spanItems[i] = document.createElement("span");
      spanItems[i].classList.add("text-letter");
      spanItems[i].textContent = `${titleLetters[i]}`;
    }
    function textAnimation() {
      for (let i = 0; i < titleLetters.length; i++) {
        title.appendChild(spanItems[i]);
        setTimeout(() => {
          spanItems[i].classList.add("is-showing");
        }, 100 * i);
      }
    }
    setTimeout(textAnimation, 1200 * i);
  });

  //blind effect
  const blind = document.querySelector(".blind");
  const blindItemsLength = 30;
  const delay = 1800;

  function makesBlindItems() {
    for (let i = 0; i < blindItemsLength; i++) {
      const blindItem = document.createElement("div");
      blindItem.classList.add("blind-item");
      blindItem.style.height = `${100 / blindItemsLength + 1}%`;
      blindItem.style.top = `${(100 / blindItemsLength) * i}%`;
      blind.appendChild(blindItem);
    }
  }
  function activateBlind() {
    const blindItems = document.querySelectorAll(".blind-item");
    blindItems.forEach((blindItem) => {
      blindItem.style.height = `0%`;
      blindItem.style.opacity = `0`;
    });
  }
  function init() {
    makesBlindItems();
  }
  function loadHandler() {
    setTimeout(() => {
      activateBlind();
    }, delay);
  }
  init();
  window.addEventListener("load", loadHandler);
}
