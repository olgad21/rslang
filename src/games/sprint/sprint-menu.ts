import { createElement } from '../../helpers';
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

  sprintMenuTitle.textContent = 'SPRINT';
  sprintMenuDescription.textContent = '«Спринт» - это тренировка';
  sprintMenuBtnStart.innerHTML = 'Играть';

  for (let i = 1; i <= 6; i++) {
    let sprintMenuBtnComplexityOptional = <HTMLElement>(
      createElement('option', 'menu-btn__complexity-optional')
    );
    sprintMenuBtnComplexityOptional.textContent = `${i}`;
    sprintMenuBtnComplexity.append(sprintMenuBtnComplexityOptional);
  }

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
