"use strict";
const header = document.querySelector(".global-header");
const navList = document.querySelector(".global-nav");
const navItems = document.querySelectorAll(".global-nav-item");
const navPointer = navList.querySelector(".pointer");
const sideNav = document.querySelector(".side-nav");
const sideNavItems = document.querySelectorAll(".side-nav-item");
const btnMenu = document.querySelector(".btn-menu");
const contents = document.querySelectorAll(".content");
let targetItem = null;

function setDataIdx(elements) {
  elements.forEach((element, idx) => {
    element.dataset.idx = idx;
  });
}

function findTargetItem(className) {
  while (!targetItem.classList.contains(className)) {
    targetItem = targetItem.parentNode;
    if (targetItem.nodeName === "BODY") {
      targetItem = null;
      return;
    }
  }
}
function moveToContent(contentPos) {
  window.scrollTo(0, contentPos);
}
function moveThePointer(targetItem, pointer, x, y) {
  const targetItemWidth = targetItem.getBoundingClientRect().width;
  const targetItemLeft = targetItem.getBoundingClientRect().left;
  const pointerWidth = pointer.getBoundingClientRect().width;
  const pointerLeftPosition =
    targetItemLeft + targetItemWidth / 2 - pointerWidth / 2 + x;
  const pointerTopPosition = targetItem.getBoundingClientRect().top + y;
  pointer.style.transform = `translate3d(${pointerLeftPosition}px,${pointerTopPosition}px,0)`;
}
function activeSideNav() {
  btnMenu.classList.add("is-active");
  sideNav.classList.add("is-active");
}
function inactiveSideNav() {
  btnMenu.classList.remove("is-active");
  sideNav.classList.remove("is-active");
}
function navMouseOverHandler(e) {
  targetItem = e.target;
  findTargetItem("global-nav-item");
  if (!targetItem) {
    return;
  }
  if (!navPointer.classList.contains("is-active")) {
    navPointer.classList.add("is-active");
  }
  moveThePointer(targetItem, navPointer, 0, -40);
}
function navMouseLeaveHandler() {
  navPointer.classList.remove("is-active");
}

function navClickHandler(e) {
  targetItem = e.target;
  findTargetItem("global-nav-item");
  if (!targetItem) {
    return;
  }
  const currentIdx = e.target.dataset.idx;
  const contentPos = contents[currentIdx].getBoundingClientRect().top + scrollY;
  moveToContent(contentPos);
  navPointer.classList.remove("is-active");
}

function sideMenuClickHandler(e) {
  targetItem = e.target;
  findTargetItem("side-nav-item");
  if (!targetItem) {
    return;
  }
  const currentIdx = e.target.dataset.idx;
  const contentPos = contents[currentIdx].getBoundingClientRect().top + scrollY;
  moveToContent(contentPos);
  inactiveSideNav();
}
function btnMenuClickHander() {
  if (!btnMenu.classList.contains("is-active")) {
    activeSideNav();
  } else {
    inactiveSideNav();
  }
}
function init() {
  setDataIdx(navItems);
  setDataIdx(sideNavItems);
  setDataIdx(contents);
}

init();

navList.addEventListener("mouseover", navMouseOverHandler);
navList.addEventListener("mouseleave", navMouseLeaveHandler);
navList.addEventListener("click", navClickHandler);
sideNav.addEventListener("click", sideMenuClickHandler);
btnMenu.addEventListener("click", btnMenuClickHander);
