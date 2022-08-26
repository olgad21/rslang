import { createElement, removeAllChildNodes, fillElement } from '../../helpers';
import createSprint from './sprint';
import './sprint.scss';

const createSprintMenu = (place: HTMLElement) => {
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

  sprintMenuBtnStart.addEventListener('click', () => {
    const wrapperMain = <HTMLElement>document.querySelector('.main__wrapper');
    const choseLvl = <HTMLElement>(
      document.querySelector('.menu-btn__complexity-optional')
    );
    const levl = choseLvl.getAttribute('value');

    removeAllChildNodes(wrapperMain);
    createSprint(wrapperMain, levl);
  });

  sprintMenuTitle.textContent = 'SPRINT';
  sprintMenuDescription.textContent = '«Спринт» - это тренировка';
  sprintMenuBtnStart.innerHTML = 'Играть';

  fillElement(
    sprintMenuBtnComplexity,
    6,
    'option',
    'menu-btn__complexity-optional',
    'value',
    true,
  );

  sprintMenuBtnContainer.append(sprintMenuBtnComplexity, sprintMenuBtnStart);
  sprintMenuContainer.append(
    sprintMenuTitle,
    sprintMenuDescription,
    sprintMenuBtnContainer,
  );
  place.append(sprintMenuContainer);

  return place;
};

export default createSprintMenu;
