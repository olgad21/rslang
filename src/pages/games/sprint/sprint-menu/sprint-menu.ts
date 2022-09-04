import createElement, { fillElement } from '../../../../helpers';
import { AudioMenu, SprintMenu } from '../sprint-enum';

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

const createSprintMenu = (place: HTMLElement, game: string) => {
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
    true,
  );

  if (game === 'sprint') {
    sprintMenuTitle.textContent = SprintMenu.title;
    sprintMenuDescription.textContent = SprintMenu.description;
    sprintMenuBtnStart.innerHTML = SprintMenu.btn;
  } else if (game === 'audio') {
    sprintMenuTitle.textContent = AudioMenu.title;
    sprintMenuDescription.textContent = AudioMenu.description;
    sprintMenuBtnStart.innerHTML = AudioMenu.btn;
  }
  sprintMenuBtnContainer.append(sprintMenuBtnComplexity, sprintMenuBtnStart);
  sprintMenuContainer.append(
    sprintMenuTitle,
    sprintMenuDescription,
    sprintMenuBtnContainer,
  );
  place.append(sprintMenuContainer);

  return sprintMenuBtnStart;
};

export default createSprintMenu;
