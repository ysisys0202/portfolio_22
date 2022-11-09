'use strict';
{
  const skillSVG = document.querySelector('#skill-svg');
  const skillList = document.querySelector('.skill-list');
  const skillItems = document.querySelectorAll('.skill-item');
  const skillDesc = document.querySelector('.skill-desc p');
  let targetItem = null;

  function setDataIdx(elements) {
    elements.forEach((element, idx) => {
      element.dataset.idx = idx;
    });
  }

  function findTargetItem(className) {
    while (!targetItem.classList.contains(className)) {
      targetItem = targetItem.parentNode;
      if (targetItem.nodeName === 'BODY') {
        targetItem = null;
        return;
      }
    }
  }

  function loadDatas() {
    return fetch('./assets/data/skills.json')
      .then((response) => response.json())
      .then((json) => json.skills);
  }

  function displayContent(datas, idx) {
    skillDesc.textContent = `${datas[idx].desc}`;
  }

  function skillMouseOverHandler(e) {
    targetItem = e.target;
    findTargetItem('skill-item');
    if (!targetItem) {
      return;
    }
    const targetIdx = Number(targetItem.dataset.idx) + 1;
    loadDatas().then((skills) => {
      displayContent(skills, targetIdx);
    });
  }

  function skillTouchHandler(e) {
    const targetIdx = Number(this.dataset.idx) + 1;
    console.log(targetIdx);
    loadDatas().then((skills) => {
      displayContent(skills, targetIdx);
    });
  }

  function skillMouseleaveHandler() {
    loadDatas().then((skills) => {
      displayContent(skills, 0);
    });
  }

  function init() {
    setDataIdx(skillItems);
    loadDatas().then((skills) => {
      displayContent(skills, 0);
    });
  }

  init();
  skillList.addEventListener('touchend', () => {
    console.log('touch!');
  });
  skillList.addEventListener('click', () => {
    console.log('click!');
  });
  skillList.addEventListener('mouseover', skillMouseOverHandler);
  skillList.addEventListener('mouseleave', skillMouseleaveHandler);
}
