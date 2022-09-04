import { UserLevel } from './Interfaces';

const createElement = (tag: string, classNames?: string | string[]) => {
  const el = document.createElement(tag);

  if (Array.isArray(classNames)) {
    el.classList.add(...classNames);
  } else {
    el.classList.add(classNames ?? '');
  }
  return el;
};

export default createElement;

const userPosition = () => {
  let userLevel: UserLevel = {
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

const fillElement = (
  place: HTMLElement,
  howManyEl: number,
  tag: string,
  classNames: string,
  attribute: string,
  text: boolean
) => {
  for (let i = 1; i <= howManyEl; i += 1) {
    const elem = <HTMLElement>createElement(tag, classNames);
    elem.setAttribute(attribute, `${i}`);

    if (text) {
      elem.textContent = `${i}`;
    }

    place.append(elem);
  }

  return place;
};

export { removeAllChildNodes, userPosition, fillElement };
