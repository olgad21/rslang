const createElement = (tag: string, classNames?: string | string[]) => {
  const el = document.createElement(tag);

  if (Array.isArray(classNames)) {
    el.classList.add(...classNames);
  } else {
    el.classList.add(classNames ?? '');
  }
  return el;
};

const userPosition = () => {
  let userLevel = {
    group: 1,
    page: 1,
  };

  const isLSExist = localStorage.getItem('userLevel');
  if (isLSExist) {
    userLevel = JSON.parse(isLSExist);
  } else {
    userLevel = {
      group: 1,
      page: 1,
    };
  }
  return userLevel;
};

const removeAllChildNodes = (parent: HTMLElement) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

export { createElement, removeAllChildNodes, userPosition };
