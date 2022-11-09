"use strict";

const stickyWrapper = document.querySelectorAll(".sticky-wrapper");
const stickySection = document.querySelectorAll(".sticky-section");
const targetEl = [
  document.querySelector(".img-cover"),
  document.querySelector(".skill-list"),
  document.querySelector(".category-wrapper"),
  [
    document.querySelector(".contact .contact-info-item:nth-child(2n-1)"),
    document.querySelector(".contact .contact-info-item:nth-child(2n)"),
  ],
];

class StickyEffect {
  constructor(wrapper, section, targetEl, startValue, endValue) {
    this.wrapper = wrapper;
    this.section = section;
    this.targetEl = targetEl;
    this.startValue = startValue;
    this.endValue = endValue;
  }
  transHeight(currentScollY) {
    const scrollY = currentScollY;
    const startPos = this.wrapper.getBoundingClientRect().top + scrollY;
    const endPos =
      startPos +
      this.wrapper.getBoundingClientRect().height -
      window.innerHeight;
    const activeRange = endPos - startPos;
    const activeScroll = scrollY - startPos;
    const activeRatio = activeScroll / activeRange;
    const calcValue =
      activeRatio * (this.endValue - this.startValue) + this.startValue;
    if (startPos <= scrollY && endPos > scrollY) {
      this.section.style.paddingTop = `0px`;
      this.targetEl.style.height = `${calcValue}%`;
      this.section.classList.add("is-active");
    } else {
      this.section.classList.remove("is-active");
      if (startPos > scrollY) {
        this.section.style.paddingTop = `0px`;
      }
      if (endPos < scrollY) {
        this.section.style.paddingTop = `${activeRange}px`;
      }
    }
  }

  transStartOffset(currentScollY) {
    const scrollY = currentScollY;
    const startPos = this.wrapper.getBoundingClientRect().top + scrollY;
    const endPos =
      startPos +
      this.wrapper.getBoundingClientRect().height -
      window.innerHeight;
    const activeRange = endPos - startPos;
    const activeScroll = scrollY - startPos;
    const activeRatio = activeScroll / activeRange;
    const calcValue =
      activeRatio * (this.endValue - this.startValue) + this.startValue;
    if (startPos <= scrollY && endPos > scrollY) {
      this.section.style.paddingTop = `0px`;
      this.targetEl.setAttribute("startOffset", `${calcValue}%`);
      this.section.classList.add("is-active");
    } else {
      this.section.classList.remove("is-active");
      if (startPos > scrollY) {
        this.section.style.paddingTop = `0px`;
      }
      if (endPos < scrollY) {
        this.section.style.paddingTop = `${activeRange}px`;
      }
    }
  }
  transX(currentScollY) {
    const scrollY = currentScollY;
    const startPos = this.wrapper.getBoundingClientRect().top + scrollY;
    const endPos =
      startPos +
      this.wrapper.getBoundingClientRect().height -
      window.innerHeight;
    const activeRange = endPos - startPos;
    const activeScroll = scrollY - startPos;
    const activeRatio = activeScroll / activeRange;
    const calcValue =
      activeRatio * (this.endValue - this.startValue) + this.startValue;
    if (startPos <= scrollY && endPos > scrollY) {
      this.section.style.paddingTop = `0px`;
      this.targetEl.style.transform = `translate3d(${calcValue}%, 0,0)`;
      if (!this.section.classList.contains("is-active")) {
        this.section.classList.add("is-active");
      }
    } else {
      if (this.section.classList.contains("is-active")) {
        this.section.classList.remove("is-active");
      }
      if (startPos > scrollY) {
        this.section.style.paddingTop = `0px`;
      }
      if (endPos < scrollY) {
        this.section.style.paddingTop = `${activeRange}px`;
      }
    }
  }
}

const StickyAbout = new StickyEffect(
  stickyWrapper[0],
  stickySection[0],
  targetEl[0],
  100,
  0,
);

const StickySkill = new StickyEffect(
  stickyWrapper[1],
  stickySection[1],
  targetEl[1],
  -100,
  100,
);

const portfolioWidth = document.querySelector(
  ".portfolio .category-wrapper",
).offsetWidth;
const windowWidthPer = (window.innerWidth / portfolioWidth) * 100;
const portfolioTransRange = 100 - windowWidthPer;
const StickyPortfolio = new StickyEffect(
  stickyWrapper[2],
  stickySection[2],
  targetEl[2],
  0,
  -portfolioTransRange,
);

const StickyContact_1 = new StickyEffect(
  stickyWrapper[3],
  stickySection[3],
  targetEl[3][0],
  -70,
  0,
);

const StickyContact_2 = new StickyEffect(
  stickyWrapper[3],
  stickySection[3],
  targetEl[3][1],
  70,
  0,
);

function init() {
  stickyWrapper.forEach((item, idx) => {
    if (idx !== 2) {
      item.style.height = `200vh`;
    }
  });
  stickyWrapper[2].style.height = `400vh`;
  targetEl[1].setAttribute("startOffset", "-100%");
}

function scrollHandler() {
  const scrollY = window.pageYOffset;

  StickyAbout.transHeight(scrollY);
  StickySkill.transStartOffset(scrollY);
  StickyPortfolio.transX(scrollY);
  StickyContact_1.transX(scrollY);
  StickyContact_2.transX(scrollY);
}
init();
window.addEventListener("scroll", scrollHandler);
