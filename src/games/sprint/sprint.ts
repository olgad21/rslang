import { createElement, fillElement } from '../../helpers';
import './sprint.scss';

const timer = (place: HTMLElement) => {

};

const createSprint = (place: HTMLElement, levl: string | null) => {
  const globeContainer = <HTMLElement>createElement('div', 'game-container');
  const sprintTitle = <HTMLElement>createElement('div', 'sprint-title');
  const sprintLevl = <HTMLElement>createElement('div', 'sprint-levl');
  const sprintContainer = <HTMLElement>createElement('div', 'sprint-container');
  const sprintTimer = <HTMLElement>(
    createElement('div', 'sprint-container__timer')
  );
  const sprintViewResults = <HTMLElement>(
    createElement('div', 'sprint-container__view-results')
  );
  const sprintWordEn = <HTMLElement>(
    createElement('div', 'sprint-container__word-en')
  );
  const sprintWordRu = <HTMLElement>(
    createElement('div', 'sprint-container__word-ru')
  );
  const sprintGameBtnContainer = <HTMLElement>(
    createElement('div', 'game-btn__container')
  );
  const sprintGameBtnFalse = <HTMLElement>(
    createElement('button', 'game-btn__container-false')
  );
  const sprintGameBtnTrue = <HTMLElement>(
    createElement('button', 'game-btn__container-true')
  );

  fillElement(
    sprintViewResults,
    20,
    'div',
    'sprint-container__view-element',
    'element',
    false,
  );

  sprintLevl.textContent = `Уровень: ${levl}`;
  sprintTitle.textContent = 'Ваш результат:';
  sprintTimer.textContent = '50';
  sprintWordEn.textContent = 'sprintWordEn';
  sprintWordRu.textContent = 'sprintWordRu';
  sprintGameBtnFalse.textContent = 'False';
  sprintGameBtnTrue.textContent = 'True';

  sprintGameBtnContainer.append(sprintGameBtnFalse, sprintGameBtnTrue);
  sprintContainer.append(
    sprintTimer,
    sprintViewResults,
    sprintWordEn,
    sprintWordRu,
    sprintGameBtnContainer,
  );
  globeContainer.append(sprintLevl, sprintTitle, sprintContainer);
  place.append(globeContainer);
  return place;
};

export default createSprint;
