import { createElement, removeAllChildNodes, fillElement } from '../../helpers';
import { SprintMenu } from './sprint-enum';
import createSprint from './sprint';

const createAllElementsSprintMenu = () => {
  const sprintMenuContainer = <HTMLElement>(
    createElement('div', 'sprint-menu__container')
  );
  const sprintMenuTitle = <HTMLElement>(
    createElement('div', 'sprint-menu__title')
  );
  const sprintMenuDescription = <HTMLElement>(
    createElement('div', 'sprint-menu__description')
  );
  const sprintMenuBtnContainer = <HTMLElement>(
    createElement('div', 'menu-btn__container')
  );
  const sprintMenuBtnComplexity = <HTMLElement>(
    createElement('select', 'menu-btn__complexity')
  );

  const sprintMenuBtnStart = <HTMLElement>(
    createElement('button', 'menu-btn__start')
  );

  return [
    sprintMenuContainer,
    sprintMenuTitle,
    sprintMenuDescription,
    sprintMenuBtnContainer,
    sprintMenuBtnComplexity,
    sprintMenuBtnStart,
  ];
};

const createSprintMenu = (place: HTMLElement) => {
  const [
    sprintMenuContainer,
    sprintMenuTitle,
    sprintMenuDescription,
    sprintMenuBtnContainer,
    sprintMenuBtnComplexity,
    sprintMenuBtnStart,
  ] = createAllElementsSprintMenu();

  fillElement(
    sprintMenuBtnComplexity,
    6,
    'option',
    'menu-btn__complexity-optional',
    'value',
    true
  );

  sprintMenuBtnStart.addEventListener('click', () => {
    const wrapperMain = <HTMLElement>document.querySelector('.main__wrapper');
    const choseLvl = <HTMLSelectElement>(
      document.querySelector('.menu-btn__complexity')
    );
    const levl = choseLvl.value;

    removeAllChildNodes(wrapperMain);
    createSprint(wrapperMain, levl);
  });

  sprintMenuTitle.textContent = SprintMenu.title;
  sprintMenuDescription.textContent = SprintMenu.description;
  sprintMenuBtnStart.innerHTML = SprintMenu.btn;

  sprintMenuBtnContainer.append(sprintMenuBtnComplexity, sprintMenuBtnStart);
  sprintMenuContainer.append(
    sprintMenuTitle,
    sprintMenuDescription,
    sprintMenuBtnContainer
  );
  place.append(sprintMenuContainer);

  return place;
};

export default createSprintMenu;
