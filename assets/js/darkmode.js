"use strict";
{
  const btnMode = document.querySelector(".btn-mode");
  const skillSVG = document.querySelector("#skill-svg");
  const skillList = document.querySelector(".skill-list");
  const footer = document.querySelector(".global-footer");

  function setLocalStorage(key, value) {
    localStorage.setItem(key, value);
  }

  function changeDark() {
    document.body.classList.add("is-dark");
    btnMode.classList.add("is-dark");
    btnMode.setAttribute("aria-label", "라이트모드로 전환");
    btnMode.innerHTML = `<i class="icon-sun" aria-hidden="true"></i>
`;
    setLocalStorage("mode", "dark");
  }

  function changeLight() {
    document.body.classList.remove("is-dark");
    btnMode.classList.remove("is-dark");
    btnMode.setAttribute("aria-label", "다크모드로 전환");
    btnMode.innerHTML = `
<i class="icon-moon" aria-hidden="true"></i>
`;
    setLocalStorage("mode", "light");
  }

  function changeMode() {
    if (!btnMode.classList.contains("is-dark")) {
      changeDark();
    } else {
      changeLight();
    }
  }
  function btnModeClickHandler() {
    if (!btnMode.classList.contains("is-dark")) {
      changeDark();
      document.body.classList.add("user-selected");
      setLocalStorage("agent", "user");
    } else {
      changeLight();
      document.body.classList.remove("user-selected");
      localStorage.removeItem("agent");
    }
  }
  function skillMouseEnterHandler() {
    if (!document.body.classList.contains("is-dark")) {
      changeDark();
    }
  }
  function skillMouseLeaveHandler() {
    changeLight();
  }
  function scrollHandler() {
    const footerOffsetTop = footer.getBoundingClientRect().top;
    const eventAgent = localStorage.getItem("agent");
    if (footerOffsetTop < (window.innerHeight * 2) / 3) {
      changeDark();
    } else {
      if (eventAgent === "user") {
        return;
      }
      changeLight();
    }
  }
  function init() {
    const savedMode = localStorage.getItem("mode");
    switch (savedMode) {
      case "dark":
        changeDark();
        break;
      case "light":
        changeLight();
        break;
    }
  }
  init();
  btnMode.addEventListener("click", btnModeClickHandler);
  skillList.addEventListener("mouseenter", skillMouseEnterHandler);
  skillList.addEventListener("mouseleave", skillMouseLeaveHandler);
  window.addEventListener("scroll", scrollHandler);
}
